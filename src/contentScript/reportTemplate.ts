import { ReportTemplateGenerator } from "../methods/ReportTemplateGenerator"

chrome.storage.sync.get(
  ["featuresReportTemplate"],
  (featuresReportTemplate) => {
    if (featuresReportTemplate) renderReportTemplate()
  }
)

const renderReportTemplate = () => {
  chrome.storage.sync.get(["reportFilename", "reportTemplate"], (result) => {
    const { reportFilename, reportTemplate } = result
    const reportTemplateGenerator = new ReportTemplateGenerator(
      reportFilename || "",
      reportTemplate || ""
    )
    reportTemplateGenerator.renderReportGeneratorRow()
  })
}
