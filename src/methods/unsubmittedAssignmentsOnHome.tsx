import dayjs from "dayjs"
import ReactDOM from "react-dom"

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
  "アンケート",
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

  const tableContainer = document.createElement("div")
  const showmoreElement = container.querySelector("div.showmore")
  container.insertBefore(tableContainer, showmoreElement)

  ReactDOM.render(asgTable({ assignments }), tableContainer)
}

const asgTable = ({ assignments }: { assignments: Assignment[] }) => (
  <table className="eventlist">
    <tbody>
      {assignments.map((asg) => (
        <tr className="bordertop">
          <td className="center eventlist-day">
            {dayjs(asg.deadline.toDateString()).format("MM/DD")}
          </td>
          <td className="event-title">
            <span className="eventlist-day">
              {dayjs(asg.deadline.toString()).format("HH:mm")}
            </span>
            <a href={getAssignmentPath(asg)}>
              <img
                src={assignmentIcon}
                alt="assignment icon"
                className="inline"
                style={{ marginRight: "0.3em" }}
                title={asg.type}
              />
              {asg.title}
            </a>
            <a href={getCoursePath(asg)}>[{asg.course}]</a>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)

const getAssignmentPath = (asg: Assignment) =>
  "course_" + asg.id.split("_").slice(1).join("_")

const getCoursePath = (asg: Assignment) => "course_" + asg.id.split("_")[1]

export { fetchAssignments, renderUnsubmittedAsgsOnHome }
