"use strict"

import type { StorageSync } from "./types/storage"

import checkAssignmentDeadline from "./methods/checkAssignmentDeadline"
import checkPagePubDeadline from "./methods/checkPagePubDeadline"
import createLinkToOptions from "./methods/createLinkToOptions"
import { dragAndDrop } from "./methods/dragAndDrop"
import { filterCourses } from "./methods/filterCourses"
import openCodeInRespon from "./methods/openCodeInRespon"
import removeLinkBalloon from "./methods/removeLinkBalloon"

const withStorageSync = (func: (storage: StorageSync) => void) => {
  chrome.storage.sync.get((storage) => {
    func(storage as StorageSync)
  })
}

window.addEventListener("DOMContentLoaded", () => {
  withStorageSync(main)
})

const main = (storageSync: StorageSync) => {
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
