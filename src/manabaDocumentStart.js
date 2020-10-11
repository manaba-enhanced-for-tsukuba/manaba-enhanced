"use strict"

import createLinkToOptions from "./methods/createLinkToOptions.js"
import removeLinkBalloon from "./methods/removeLinkBalloon.js"
import filterCourses from "./methods/filterCourses.js"
import checkPagePubDeadline from "./methods/checkPagePubDeadline.js"
import checkAssignmentDeadline from "./methods/checkAssignmentDeadline.js"
import openCodeInRespon from "./methods/openCodeInRespon.js"

window.addEventListener("DOMContentLoaded", () => {
  createLinkToOptions()

  removeLinkBalloon()

  const coursesContainer = document.getElementsByClassName("mycourses-body")[0]
  if (coursesContainer) {
    filterCourses()
  }

  const pageLimitView = document.getElementsByClassName("pagelimitview")[0]
  if (pageLimitView) {
    checkPagePubDeadline(pageLimitView)
  }

  const stdlist = document.getElementsByClassName("stdlist")[0]
  if (stdlist) {
    checkAssignmentDeadline()
  }

  chrome.runtime.onMessage.addListener((msg) => {
    switch (msg.kind) {
      case "open-in-respon": {
        const selectedText = window.getSelection().toString()
        openCodeInRespon(selectedText)
        break
      }
    }
  })
})
