"use strict"

import removeLinkBalloon from "./methods/removeLinkBalloon.js"
import checkPagePubDeadline from "./methods/checkPagePubDeadline.js"
import checkAssignmentDeadline from "./methods/checkAssignmentDeadline.js"
import openCodeInRespon from "./methods/openCodeInRespon.js"

window.addEventListener("DOMContentLoaded", () => {
  removeLinkBalloon()

  const pageLimitView = document.getElementsByClassName("pagelimitview")[0]
  if (pageLimitView) {
    checkPagePubDeadline(pageLimitView)
  }

  const stdlist = document.getElementsByClassName("stdlist")[0]
  if (stdlist) {
    checkAssignmentDeadline()
  }

  window.onkeydown = (e) => {
    if (e.altKey && e.code === "KeyR") {
      const selectedText = window.getSelection().toString()
      openCodeInRespon(selectedText)
    }
  }
})
