"use strict"

import checkAssignmentDeadline from "./methods/checkAssignmentDeadline"
import checkPagePubDeadline from "./methods/checkPagePubDeadline"
import colorizeDeadline from "./methods/colorizeDeadline"
import createLinkToOptions from "./methods/createLinkToOptions"
import { dragAndDrop } from "./methods/dragAndDrop"
import { filterCourses } from "./methods/filterCourses"
import openCodeInRespon from "./methods/openCodeInRespon"
import removeLinkBalloon from "./methods/removeLinkBalloon"
import { syncReportText, clearStorage } from "./methods/syncReportText"
import { setUsermemoShortcuts } from "./methods/usermemo"
import { getStorage } from "./network/storage"
import colorizeDeadlineStyles from "./style/colorizeDeadline.sass"
import type { StorageSync } from "./types/storage"

window.addEventListener("DOMContentLoaded", () => {
  getStorage({
    kind: "sync",
    keys: null,
    callback: main,
  })
})

const insertStyle = ({
  styleString,
  id,
}: {
  styleString: string
  id?: string
}) => {
  const style = document.createElement("style")
  style.innerHTML = styleString
  if (id) style.id = id
  document.head.appendChild(style)
}

const withDocumentHead = (storageSync: Partial<StorageSync>) => {
  const url = window.location.href

  insertStyle({
    styleString: colorizeDeadlineStyles.toString(),
  })

  if (storageSync.featuresAssignmentsColoring) {
    if (url.includes("home_library_query")) {
      colorizeDeadline({})
    } else if (
      url.endsWith("query") ||
      url.endsWith("survey") ||
      url.endsWith("report")
    ) {
      colorizeDeadline({ checkStatus: true })
    }
  }

  if (storageSync.featuresAutoSaveReports) {
    if (url.includes("report")) {
      const submitBtn = document.querySelector(
        "input[name='action_ReportStudent_submitdone']"
      )
      if (submitBtn) {
        syncReportText()

        chrome.storage.local.getBytesInUse((bytesInUse) => {
          if (bytesInUse > 4500000) {
            clearStorage()
          }
        })
      }
    }
  }
}

const main = (storageSync: Partial<StorageSync>) => {
  if (document.head) {
    withDocumentHead(storageSync)
  } else {
    let headFound = false
    new MutationObserver(() => {
      if (!headFound && document.head) {
        headFound = true
        withDocumentHead(storageSync)
      }
    }).observe(document.documentElement, { childList: true })
  }

  createLinkToOptions()

  if (storageSync.featuresRemoveConfirmation) {
    removeLinkBalloon()
  }

  if (storageSync.featuresFilterCourses) {
    const coursesContainer =
      document.getElementsByClassName("mycourses-body")[0]

    if (coursesContainer) {
      filterCourses()
    }
  }

  if (storageSync.featuresDeadlineHighlighting) {
    const pageLimitView = document.getElementsByClassName(
      "pagelimitview"
    )[0] as HTMLElement
    if (pageLimitView) {
      checkPagePubDeadline(pageLimitView)
    }

    const stdlist = document.getElementsByClassName("stdlist")[0]
    if (stdlist) {
      checkAssignmentDeadline()
    }
  }

  if (storageSync.featuresDragAndDrop) {
    dragAndDrop()
  }

  if (window.location.href.includes("usermemo")) {
    setUsermemoShortcuts()
  }

  chrome.runtime.onMessage.addListener((msg) => {
    switch (msg.kind) {
      case "open-in-respon": {
        const selectedText = window.getSelection()?.toString()
        if (selectedText) openCodeInRespon(selectedText)
        break
      }
    }
  })
}
