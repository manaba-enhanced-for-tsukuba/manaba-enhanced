"use strict"

/**
 * Don't add DOM handling procedures to this file.
 * Follow the React way instead.
 */

import { ReportTemplateFormHandler } from "../methods/handleReportTemplateForm"
import { getStorage, setStorage } from "../network/storage"
import "../style/options.scss"
import { isFeature } from "../types/feature"

export const startLegacyHandler = () => {
  ;(
    Array.from(
      document.getElementsByClassName("checkbox-features")
    ) as HTMLInputElement[]
  ).map((dom) => {
    const key = dom.id
    if (!isFeature(key)) return

    getStorage({
      kind: "sync",
      keys: key,
      callback: (storage) => {
        const value = storage[key]
        if (typeof value === "boolean") dom.checked = value
      },
    })

    dom.addEventListener("change", (event) => {
      const target = event.target as HTMLInputElement
      setStorage({
        kind: "sync",
        items: {
          [key]: target.checked,
        },
      })
    })
  })

  new ReportTemplateFormHandler().start()
}
