"use strict"

import { throttle } from "lodash-es"

import { getBytesInUse, getStorage, setStorage } from "../network/storage"

const syncReportText = (): void => {
  const textarea = document.getElementsByTagName("textarea")[0]

  const getId = () => {
    const url = window.location.href
    return url.substr(url.indexOf("manaba.tsukuba.ac.jp/ct/") + 24)
  }

  getStorage({
    kind: "local",
    keys: "reportText",
    callback: (storage) => {
      const savedText = storage.reportText?.[getId()]?.text ?? ""
      textarea.value = savedText
    },
  })

  const writeReportText = throttle((id, text) => {
    getStorage({
      kind: "local",
      keys: "reportText",
      callback: (storage) => {
        setStorage({
          kind: "local",
          items: {
            reportText: {
              ...storage.reportText,
              [id]: {
                text,
                modified: Date.now(),
              },
            },
          },
        })
      },
    })
  }, 2000)

  if (textarea) {
    textarea.addEventListener("input", () => {
      writeReportText(getId(), textarea.value)
    })
  }
}

const clearStorage = (): void => {
  let curOldestKey: string
  let curMinModified = 99999999999999

  getStorage({
    kind: "local",
    keys: "reportText",
    callback: ({ reportText }) => {
      if (!reportText) return

      for (const key of Object.keys(reportText)) {
        if (reportText[key].modified < curMinModified) {
          curOldestKey = key
          curMinModified = reportText[key].modified
        }
      }
      delete reportText[curOldestKey]
      setStorage({ kind: "local", items: { reportText } })

      getBytesInUse({ kind: "local" }).then((bytesInUse) => {
        if (bytesInUse > 4500000) {
          clearStorage()
        }
      })
    },
  })
}

export { syncReportText, clearStorage }
