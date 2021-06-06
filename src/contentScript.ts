"use strict"

import type { StorageSync } from "./types/storage"
import { getStorage } from "./network/storage"

import checkAssignmentDeadline from "./methods/checkAssignmentDeadline"
import checkPagePubDeadline from "./methods/checkPagePubDeadline"
import colorizeDeadline from "./methods/colorizeDeadline"
import createLinkToOptions from "./methods/createLinkToOptions"
import { dragAndDrop } from "./methods/dragAndDrop"
import { filterCourses } from "./methods/filterCourses"
import openCodeInRespon from "./methods/openCodeInRespon"
import removeLinkBalloon from "./methods/removeLinkBalloon"
import { syncReportText, clearStorage } from "./methods/syncReportText"

import colorizeDeadlineStyles from "./style/colorizeDeadline.sass"

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

  if (storageSync["features-assignments-coloring"]) {
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

  if (storageSync["features-autosave-reports"]) {
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

  if (storageSync["features-remove-confirmation"]) {
    removeLinkBalloon()
  }

  if (storageSync["features-filter-courses"]) {
    const coursesContainer =
      document.getElementsByClassName("mycourses-body")[0]

    if (coursesContainer) {
      filterCourses()
    }
  }

  if (storageSync["features-deadline-highlighting"]) {
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
