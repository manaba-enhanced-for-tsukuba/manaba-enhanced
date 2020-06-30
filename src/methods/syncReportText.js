"use strict"

const syncReportText = () => {
  const textarea = document.getElementsByTagName("textarea")[0]

  const getId = () => {
    const url = window.location.href
    return url.substr(url.indexOf("manaba.tsukuba.ac.jp/ct/") + 24)
  }

  chrome.storage.local.get("reportText", (result) => {
    if (Object.keys(result).length) {
      textarea.value = result.reportText[getId()].text
    }
  })

  const writeReportText = (id, text) => {
    chrome.storage.local.get("reportText", (result) => {
      if (!Object.keys(result).length) {
        result = {}
        chrome.storage.local.set({ reportText: {} })
      }
      if (!Object.keys(result.reportText).length) {
        result.reportText = {}
      }
      result.reportText[id] = {
        text: text,
        modified: Date.now(),
      }

      chrome.storage.local.set(result)
    })
  }

  if (textarea) {
    textarea.addEventListener("input", (e) => {
      if (!e.isComposing) {
        writeReportText(getId(), textarea.value)
      }
    })
    window.onkeyup = (e) => {
      if (e.code === "Enter") {
        writeReportText(getId(), textarea.value)
      }
    }
  }
}

const clearStorage = () => {
  let curOldestKey
  let curMinModified = 99999999999999

  chrome.storage.local.get("reportText", (result) => {
    for (const key of Object.keys(result.reportText)) {
      if (result.reportText[key].modified < curMinModified) {
        curOldestKey = key
        curMinModified = result.reportText[key].modified
      }
    }
    delete result.reportText[curOldestKey]
    chrome.storage.local.set(result)

    chrome.storage.local.getBytesInUse((bytesInUse) => {
      if (bytesInUse > 4500000) {
        clearStorage()
      }
    })
  })
}

export { syncReportText, clearStorage }
