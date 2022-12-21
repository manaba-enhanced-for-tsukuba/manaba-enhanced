import dayjs from "dayjs"

import { homeLibraryQuery, assignmentIcon } from "../json/uri.json"

class Assignment {
  constructor(
    public id: string,
    public type: string,
    public title: string,
    public course: string,
    public deadline: Date
  ) {}
}

const asgTableColumn = {
  type: 0,
  title: 1,
  course: 2,
  start: 3,
  end: 4,
} as const

const targetAsgType = new Set([
  chrome.i18n.getMessage("test"),
  chrome.i18n.getMessage("assignment"),
])

const parseRawDOM = async (url: string) =>
  fetch(url)
    .then((res) => res.text())
    .then((text) => new DOMParser().parseFromString(text, "text/html"))

const asgPageTable = (asgPageDOM: Document) =>
  asgPageDOM.querySelector<HTMLTableElement>(".contentbody-l table")

const getAsgsFromTable = (table: HTMLTableElement) =>
  Array.from(table.rows)
    .filter((row) => targetAsgType.has(getAsgType(row)))
    .filter((row) => getAsgDeadline(row))
    .map(
      (row) =>
        new Assignment(
          getAsgID(row),
          getAsgType(row),
          getAsgTitle(row),
          getAsgCourse(row),
          getAsgDeadline(row)
        )
    )

/**
 * @example course_XXXXXXX_query_XXXXXXX, course_XXXXXXX_report_XXXXXXX
 */
const getAsgID = (row: HTMLTableRowElement) =>
  row.children[asgTableColumn.title]
    .querySelector<HTMLAnchorElement>("a")
    ?.href.split("/")
    .pop() || ""

const getAsgType = (row: HTMLTableRowElement) =>
  row.children[asgTableColumn.type].textContent?.trim() || ""

const getAsgTitle = (row: HTMLTableRowElement) =>
  row.children[asgTableColumn.title].textContent?.trim() || ""

const getAsgCourse = (row: HTMLTableRowElement) =>
  row.children[asgTableColumn.course].textContent?.trim() || ""

const getAsgDeadline = (row: HTMLTableRowElement) =>
  new Date(row.children[asgTableColumn.end].textContent?.trim() || "")

const fetchAssignments = () =>
  parseRawDOM(homeLibraryQuery)
    .then((DOM) => asgPageTable(DOM))
    .then((table) => table && getAsgsFromTable(table))

const renderUnsubmittedAsgsOnHome = (
  assignments: Assignment[],
  document: Document
) => {
  const container = document.querySelector(
    "#container > div.pagebody > div.my-course.my-courseV2 > div.contentbody-right > div.my-infolist.my-infolist-event.my-infolist-submitlog > div:nth-child(2)"
  )
  if (!container) return

  const asgTable = document.createElement("table")
  asgTable.classList.add("eventlist")
  const asgTableBody = document.createElement("tbody")
  asgTable.appendChild(asgTableBody)
  assignments.forEach((asg) => {
    const asgTableHeader = document.createElement("tr")
    asgTableHeader.classList.add("bordertop")
    const asgTableHeaderDate = document.createElement("td")
    asgTableHeaderDate.classList.add("center", "eventlist-day")
    asgTableHeaderDate.textContent = dayjs(
      asg.deadline.toLocaleDateString()
    ).format("MM/DD")
    asgTableHeader.appendChild(asgTableHeaderDate)
    const asgTableHeaderTitle = document.createElement("td")
    asgTableHeaderTitle.classList.add("event-title")
    const asgTableHeaderTitleTime = document.createElement("span")
    asgTableHeaderTitleTime.classList.add("eventlist-day")
    asgTableHeaderTitleTime.textContent = dayjs(asg.deadline.toString()).format(
      "HH:mm"
    )
    asgTableHeaderTitle.appendChild(asgTableHeaderTitleTime)
    const asgTableHeaderTitleLink = document.createElement("a")
    asgTableHeaderTitleLink.href =
      "course_" + asg.id.split("_").slice(1).join("_")
    asgTableHeaderTitleLink.textContent = asg.title
    asgTableHeaderTitle.appendChild(asgTableHeaderTitleLink)
    const asgTableHeaderTitleIcon = document.createElement("img")
    asgTableHeaderTitleIcon.src = assignmentIcon
    asgTableHeaderTitleIcon.alt = "assignment icon"
    asgTableHeaderTitleIcon.classList.add("inline")
    asgTableHeaderTitleIcon.style.marginRight = "0.3em"
    asgTableHeaderTitleIcon.title = asg.type
    asgTableHeaderTitleLink.prepend(asgTableHeaderTitleIcon)
    const asgTableHeaderTitleCourse = document.createElement("a")
    asgTableHeaderTitleCourse.href = "course_" + asg.id.split("_")[1]
    asgTableHeaderTitleCourse.textContent = `[${asg.course}]`
    asgTableHeaderTitle.appendChild(asgTableHeaderTitleCourse)
    asgTableHeader.appendChild(asgTableHeaderTitle)
    asgTableBody.appendChild(asgTableHeader)
  })
  const showmoreElement = container.querySelector("div.showmore")
  container.insertBefore(asgTable, showmoreElement)
}

export { fetchAssignments, renderUnsubmittedAsgsOnHome }
