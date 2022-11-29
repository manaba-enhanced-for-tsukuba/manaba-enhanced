const syllabusURL = (courseCode: string, year: string) =>
  `https://kdb.tsukuba.ac.jp/syllabi/${year}/${courseCode}/jpn`

const getCourseCode = (element: HTMLElement) => element.innerText
const getYear = (element: HTMLElement) => element.innerText.split(" ").shift()

const syllabiAnchorElement = (courseCode: string, year: string) => {
  const element = document.createElement("a")
  element.setAttribute("href", syllabusURL(courseCode, year))
  element.setAttribute("target", "_blank")
  element.setAttribute("rel", "external")
  element.innerText = courseCode

  return element
}

const isValidCourseCode = (courseCode: string) =>
  /[A-Z0-9]{7,}/.test(courseCode)

const replaceCourseCode = (
  element: HTMLElement,
  courseCode: string,
  year: string
) => (element.innerHTML = syllabiAnchorElement(courseCode, year).outerHTML)

const linkCourseCodesTokDB = () => {
  const courseCodeElement = document.querySelector<HTMLElement>(".coursecode")
  const courseDataInfoElement =
    document.querySelector<HTMLElement>(".coursedata-info")
  if (!courseCodeElement || !courseDataInfoElement) return

  const courseCode = getCourseCode(courseCodeElement)
  const year = getYear(courseDataInfoElement)
  if (!isValidCourseCode(courseCode) || !year) return

  replaceCourseCode(courseCodeElement, courseCode, year)
}

export { linkCourseCodesTokDB }
