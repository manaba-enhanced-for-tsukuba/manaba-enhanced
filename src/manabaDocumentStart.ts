"use strict"

import createLinkToOptions from "./methods/createLinkToOptions"
import removeLinkBalloon from "./methods/removeLinkBalloon"
import filterCourses from "./methods/filterCourses"
import checkPagePubDeadline from "./methods/checkPagePubDeadline"
import checkAssignmentDeadline from "./methods/checkAssignmentDeadline"
import openCodeInRespon from "./methods/openCodeInRespon"

let storageSync: { [key: string]: string }
chrome.storage.sync.get((result) => {
  storageSync = result
})

window.addEventListener("DOMContentLoaded", () => {
  createLinkToOptions()

  if (storageSync["features-remove-confirmation"]) {
    removeLinkBalloon()
  }

  if (storageSync["features-filter-courses"]) {
    const coursesContainer = document.getElementsByClassName(
      "mycourses-body"
    )[0]

    if (coursesContainer) {
      filterCourses()
    }
  }

  if (storageSync["features-deadline-highlighting"]) {
    const pageLimitView = document.getElementsByClassName("pagelimitview")[0] as HTMLElement
    if (pageLimitView) {
      checkPagePubDeadline(pageLimitView)
    }

    const stdlist = document.getElementsByClassName("stdlist")[0]
    if (stdlist) {
      checkAssignmentDeadline()
    }
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
})
