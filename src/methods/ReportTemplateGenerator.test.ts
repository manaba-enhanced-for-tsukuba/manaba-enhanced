import { ReportTemplateGenerator } from "./ReportTemplateGenerator"

describe("ReportTemplateGenerator module", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test("replace expressions with report info", () => {
    const reportInfo = {
      courseName: `The Great Course`,
      reportTitle: `The Great Report`,
      studentName: `Tsukuba Taro`,
      deadline: new Date(`2021-01-01 00:00:00`),
      description: `Show how great the university of Tsukuba is.`,
    }
    const userFilename = `{{studentName}}_{{courseName}}_{{reportTitle}}.tex`
    const userTemplate = `The report whose title is {{report-title}} is due to {{deadline}}`
    const expectedUserTemplate = `The report whose title is The Great Report is due to 2021/1/1 0:00:00`

    jest
      .spyOn(ReportTemplateGenerator.prototype as any, "searchReportInfo")
      .mockReturnValue(reportInfo)

    expect(
      new ReportTemplateGenerator(userFilename, userTemplate).template
    ).toBe(expectedUserTemplate)
  })
})
