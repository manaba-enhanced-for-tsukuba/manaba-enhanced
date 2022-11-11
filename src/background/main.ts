"use strict"

import { getStorage, setStorage, onStorageChanged } from "../network/storage"

const removeAttachmentHeader = (
  details: chrome.webRequest.WebResponseHeadersDetails
) => {
  const headers = details.responseHeaders

  const contentDispositionHeaderIndex = headers?.findIndex(
    (header) => header.name.toLowerCase() === "content-disposition"
  )
  if (
    !headers ||
    !contentDispositionHeaderIndex ||
    contentDispositionHeaderIndex === -1
  ) {
    return
  }

  const contentDisposition = headers[contentDispositionHeaderIndex].value
  if (contentDisposition?.startsWith("attachment;")) {
    headers.splice(contentDispositionHeaderIndex, 1)
    return { responseHeaders: headers }
  }

  return
}

const disableForceFileSaving = () => {
  chrome.webRequest.onHeadersReceived.addListener(
    removeAttachmentHeader,
    { urls: ["*://manaba.tsukuba.ac.jp/*"] },
    ["blocking", "responseHeaders"]
  )
}

const stopDisablingForceFileSaving = () => {
  chrome.webRequest.onHeadersReceived.removeListener(removeAttachmentHeader)
}

onStorageChanged({
  kind: "sync",
  callback: ({ featuresDisableForceFileSaving }) => {
    if (featuresDisableForceFileSaving?.newValue === true) {
      disableForceFileSaving()
    } else if (featuresDisableForceFileSaving?.newValue === false) {
      stopDisablingForceFileSaving()
    }
  },
})

chrome.runtime.onInstalled.addListener((details) => {
  if (["install", "update"].includes(details.reason)) {
    const query = new URLSearchParams({
      event: details.reason,
    })

    chrome.tabs.create({
      url: `${chrome.runtime.getURL("options.html")}?${query.toString()}`,
    })
  }

  getStorage({
    kind: "sync",
    keys: null,
    callback: (storage) => {
      setStorage({
        kind: "sync",
        items: {
          featuresAssignmentsColoring:
            storage.featuresAssignmentsColoring ?? true,
          featuresDeadlineHighlighting:
            storage.featuresDeadlineHighlighting ?? true,
          featuresAutoSaveReports: storage.featuresAutoSaveReports ?? true,
          featuresRemoveConfirmation:
            storage.featuresRemoveConfirmation ?? true,
          featuresFilterCourses: storage.featuresFilterCourses ?? true,
          featuresDragAndDrop: storage.featuresDragAndDrop ?? true,
          featuresReportTemplate: storage.featuresReportTemplate ?? true,
          featuresDisableForceFileSaving:
            storage.featuresDisableForceFileSaving ?? true,
          featuresAssignmentDeadlineNotification:
            storage.featuresAssignmentDeadlineNotification ?? false,
        },
      })

      if (storage.featuresDisableForceFileSaving !== false) {
        disableForceFileSaving()
      }
    },
  })

  chrome.contextMenus.create({
    id: "respon",
    type: "normal",
    contexts: ["selection"],
    title: "Open this code in Respon",
  })
})

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "openOptionsPage") {
    chrome.runtime.openOptionsPage()
  }
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (
    info.menuItemId === "respon" &&
    tab &&
    tab.url &&
    tab.url.includes("manaba.tsukuba.ac.jp")
  ) {
    if (tab.id) {
      chrome.tabs.sendMessage(tab.id, { kind: "open-in-respon" })
    }
  }
})

chrome.commands.onCommand.addListener((cmd: string, tab: chrome.tabs.Tab) => {
  switch (cmd) {
    case "manaba-enhanced:open-in-respon": {
      if (tab.id) chrome.tabs.sendMessage(tab.id, { kind: "open-in-respon" })
      break
    }
  }
})

/* The listener for report template generator */
chrome.runtime.onMessage.addListener(({ url, filename }) => {
  chrome.downloads.download({
    url,
    filename,
    conflictAction: "overwrite",
    saveAs: true,
  })
  return true
})

chrome.runtime.onMessage.addListener(
  ({ action, data }) =>
    action === "alarm-delete-assignment-from-db" &&
    chrome.alarms.create(`delete-assignment-${data.id}`, {
      when: data.deadline.getTime() + 1000 * 60 * 60 * 24,
    })
)

chrome.alarms.onAlarm.addListener(({ name }) => {
  if (name.startsWith("delete-assignment-")) {
    const id = name.replace("delete-assignment-", "")
    getCurrentTab(
      (tab) =>
        tab.id &&
        chrome.tabs.sendMessage(tab.id, { kind: "delete-assignment", id })
    )
  }
})

const getCurrentTab = (callback: (tab: chrome.tabs.Tab) => void) =>
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, ([tab]) =>
    callback(tab)
  )

export { getCurrentTab }
