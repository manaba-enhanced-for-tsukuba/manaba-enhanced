import { ReportTemplateGenerator } from "../methods/ReportTemplateGenerator"
import { getStorage } from "../network/storage"

getStorage({
  kind: "sync",
  keys: "featuresReportTemplate",
  callback: ({ featuresReportTemplate }) => {
    if (featuresReportTemplate) renderReportTemplate()
  },
})

const renderReportTemplate = () => {
  getStorage({
    kind: "sync",
    keys: ["reportTemplate", "reportFilename"],
    callback: ({ reportTemplate, reportFilename }) => {
      const reportTemplateGenerator = new ReportTemplateGenerator(
        reportFilename || "",
        reportTemplate || ""
      )
      reportTemplateGenerator.renderReportGeneratorRow()
    },
  })
}
