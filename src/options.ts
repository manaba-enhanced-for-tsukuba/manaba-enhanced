"use strict"

import { ReportTemplateGenerator } from "./methods/ReportTemplateGenerator"
import { getStorage, setStorage } from "./network/storage"
import type { StorageSync } from "./types/storage"

import "./style/options.scss"

window.onload = () => {
  const query = new URLSearchParams(window.location.search)
  const queryEvent = query.get("event")

  const versionNum = chrome.runtime.getManifest().version

  if (queryEvent && ["install", "update"].includes(queryEvent)) {
    const noticeDom = document.getElementById("notice")
    if (noticeDom && noticeDom.parentElement) {
      noticeDom.parentElement.style.display = "block"

      switch (queryEvent) {
        case "install":
          noticeDom.innerText = `Thanks for installing manaba Enhanced version ${versionNum}`
          break
        case "update":
          noticeDom.innerText = `manaba Enhanced is updated for version ${versionNum}`
          break
      }
    }
  }

  const versionNumDom = document.getElementById("version-number")
  if (versionNumDom) versionNumDom.innerText = versionNum

  const linkToShortcutsSettings = document.getElementById(
    "link-to-shortcuts-settings"
  )
  if (linkToShortcutsSettings) {
    linkToShortcutsSettings.onclick = (e) => {
      e.preventDefault()
      chrome.tabs.create({ url: "chrome://extensions/shortcuts" })
      return false
    }
  }

  ;(
    Array.from(
      document.getElementsByClassName("checkbox-features")
    ) as HTMLInputElement[]
  ).map((dom) => {
    const key = dom.id as keyof Pick<
      StorageSync,
      | "featuresAssignmentsColoring"
      | "featuresAutoSaveReports"
      | "featuresDeadlineHighlighting"
      | "featuresRemoveConfirmation"
      | "featuresFilterCourses"
      | "featuresDragAndDrop"
      | "featuresReportTemplate"
    >

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
}

const handleReportTemplateForm = () => {
  const reportTemplateForm = document.querySelector<HTMLFormElement>(
    "#save-report-template"
  )
  if (!reportTemplateForm) return

  const reportTemplateTextarea =
    reportTemplateForm?.querySelector<HTMLTextAreaElement>("#report-template")
  const reportFilenameTextarea =
    reportTemplateForm?.querySelector<HTMLTextAreaElement>("#report-filename")
  if (!reportTemplateTextarea || !reportFilenameTextarea) return

  placeholdDefaultTemplate(reportTemplateTextarea, reportFilenameTextarea)
  renderUserReportTemplate(reportTemplateTextarea, reportFilenameTextarea)
  storeUserReportTemplate(
    reportTemplateForm,
    reportTemplateTextarea,
    reportFilenameTextarea
  )
}

const storeUserReportTemplate = (
  reportTemplateForm: HTMLFormElement,
  reportTemplateTextarea: HTMLTextAreaElement,
  reportFilenameTextarea: HTMLTextAreaElement
) =>
  reportTemplateForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const reportTemplate = reportTemplateTextarea.value
    const reportFilename = reportFilenameTextarea.value
    chrome.storage.sync.set({ reportTemplate, reportFilename }, () =>
      alert("Successfully saved!\nSettings will be synced across your Chrome.")
    )
  })

const renderUserReportTemplate = (
  reportTemplateTextarea: HTMLTextAreaElement,
  reportFilenameTextarea: HTMLTextAreaElement
) =>
  chrome.storage.sync.get(["reportTemplate", "reportFilename"], (storage) => {
    const { reportTemplate, reportFilename } = storage
    if (reportTemplate) reportTemplateTextarea.value = reportTemplate
    if (reportFilename) reportFilenameTextarea.value = reportFilename
  })

const placeholdDefaultTemplate = (
  reportTemplateTextarea: HTMLTextAreaElement,
  reportFilenameTextarea: HTMLTextAreaElement
) => {
  reportTemplateTextarea.placeholder = ReportTemplateGenerator.defaultTemplate
  reportFilenameTextarea.placeholder = ReportTemplateGenerator.defaultFilename
}

handleReportTemplateForm()
