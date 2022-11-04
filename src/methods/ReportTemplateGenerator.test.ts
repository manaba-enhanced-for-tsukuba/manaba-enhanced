import { ReportTemplateGenerator } from "./ReportTemplateGenerator"

describe("ReportTemplateGenerator module", () => {
  const reportInfo = {
    courseName: `The Great Course`,
    reportTitle: `The Great Report/2`,
    studentName: `Tsukuba Taro`,
    deadline: new Date(`2021-01-01 00:00:00`),
    description: `Show how great the university of Tsukuba is.`,
  }
  const getReportTemplate = (userTemplate: string) =>
    new ReportTemplateGenerator("", userTemplate, reportInfo).template
  const getFilename = (userFilename: string) =>
    new ReportTemplateGenerator(userFilename, "", reportInfo).filename

  it("replaces expressions in report template with report info", () =>
    expect(
      getReportTemplate(
        `The report whose title is {{report-title}} is due to {{deadline}}`
      )
    ).toBe(
      `The report whose title is The Great Report/2 is due to 2021/1/1 0:00:00`
    ))

  it("replaces expressions in filenames with report info", () =>
    expect(
      getFilename(`{{student-name}}_{{course-name}}_{{report-title}}.tex`)
    ).toBe(`Tsukuba Taro_The Great Course_The Great Report_2.tex`))

  it("removes slashes from a filename", () =>
    expect(
      getFilename(`{{student-name}}/{{course-name}}/{{report-title}}.tex`)
    ).toBe(`Tsukuba Taro_The Great Course_The Great Report_2.tex`))

  test("templates should not be empty even if user template is empty", () =>
    expect(getReportTemplate("")).toBeTruthy())

  test("filenames should not be empty even if user filename is empty", () =>
    expect(getFilename("")).toBeTruthy())
})
