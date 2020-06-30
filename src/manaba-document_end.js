"use strict"

import colorizeDeadline from "./methods/colorizeDeadline.js"
import { syncReportText, clearStorage } from "./methods/syncReportText.js"

import "./manaba.sass"

window.onload = () => {
  const url = window.location.href

  if (url.indexOf("home_library_query") !== -1) {
    colorizeDeadline({})
  } else if (
    url.lastIndexOf("query") === url.length - 5 ||
    url.lastIndexOf("survey") === url.length - 6 ||
    url.lastIndexOf("report") === url.length - 6
  ) {
    colorizeDeadline({ checkStatus: true })
  }

  if (url.indexOf("report") !== -1) {
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
