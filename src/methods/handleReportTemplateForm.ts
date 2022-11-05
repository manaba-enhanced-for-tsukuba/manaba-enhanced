import { ReportTemplateGenerator } from "./ReportTemplateGenerator"

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

export { handleReportTemplateForm }
