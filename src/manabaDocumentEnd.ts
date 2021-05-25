"use strict"

import type { StorageSync } from "./types/storage"

import colorizeDeadline from "./methods/colorizeDeadline"
import { syncReportText, clearStorage } from "./methods/syncReportText"

import "./style/colorizeDeadline.sass"

chrome.storage.sync.get((storage) => {
  main(storage as StorageSync)
})

const main = (storageSync: StorageSync) => {
  const url = window.location.href

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
