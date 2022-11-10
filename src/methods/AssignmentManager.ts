/**
 * @description The consistency of assignment data relys on the identity of the primary key of the database.
 */

import Dexie, { Table } from "dexie"

type AssignmentData = {
  id: string | undefined
  type: string
  title: string
  course: string
  deadline: string | null
}

const enum AssignmentTableColumn {
  Type = 0,
  Title = 1,
  Course = 2,
  Start = 3,
  End = 4,
}

class AssignmentDatabase extends Dexie {
  public assignments!: Table<AssignmentData, string>

  public constructor() {
    super("AssignmentDatabase")
    this.version(1).stores({
      assignments: "id, type, title, course, deadline",
    })
  }
}

class AssignmentManager {
  init() {
    this.storeAssignmentData()
  }

  static manabaAssignmentURL =
    "https://manaba.tsukuba.ac.jp/ct/home_library_query"

  static targetAssignmentType = new Set([
    chrome.i18n.getMessage("test"),
    chrome.i18n.getMessage("assignment"),
  ])

  private parseRawText = async (url: string) =>
    fetch(url)
      .then((res) => res.text())
      .then((text) => new DOMParser().parseFromString(text, "text/html"))

  private assignmentPageDOM = async () =>
    await this.parseRawText(AssignmentManager.manabaAssignmentURL)

  private assignmentPageTable = (assignmentPageDOM: Document) =>
    assignmentPageDOM.querySelector<HTMLTableElement>(".contentbody-l table")

  private getAssignmentDataFromTable = (table: HTMLTableElement | null) =>
    table &&
    Array.from(table.rows)
      .filter((row) =>
        AssignmentManager.targetAssignmentType.has(this.getAssignmentType(row))
      )
      .filter((row) => this.getAssignmentDeadline(row))
      .map((row) => this.assignmentData(row))

  /**
   * @example course_XXXXXXX_query_XXXXXXX, course_XXXXXXX_report_XXXXXXX
   */
  private getAssignmentID = (row: HTMLTableRowElement) =>
    row.children[AssignmentTableColumn.Title]
      .querySelector<HTMLAnchorElement>("a")
      ?.href.split("/")
      .pop()

  private getAssignmentType = (row: HTMLTableRowElement) =>
    row.children[AssignmentTableColumn.Type].textContent || ""

  private getAssignmentTitle = (row: HTMLTableRowElement) =>
    row.children[AssignmentTableColumn.Title].textContent?.trim() || ""

  private getAssignmentCourse = (row: HTMLTableRowElement) =>
    row.children[AssignmentTableColumn.Course].textContent?.trim() || ""

  private getAssignmentDeadline = (row: HTMLTableRowElement) =>
    row.children[AssignmentTableColumn.End].textContent

  /**
   *
   * @param row HTMLTableRowElement. Assignment table row.
   * @returns assignmentData. Assignment data.
   *
   * @todo You can extend this function to return more data.
   */
  private assignmentData = (row: HTMLTableRowElement): AssignmentData => {
    return {
      id: this.getAssignmentID(row),
      type: this.getAssignmentType(row),
      title: this.getAssignmentTitle(row),
      course: this.getAssignmentCourse(row),
      deadline: this.getAssignmentDeadline(row),
    }
  }

  private putAssignmentData = (data: AssignmentData[] | null) => {
    if (!data) return

    const db = new AssignmentDatabase()
    data.forEach((datum) => {
      db.assignments.add(datum).then((id) => {
        db.assignments.get(id).then((data) => {
          data &&
            chrome.runtime.sendMessage({
              action: "assignmentDeadlineNotification",
              assignmentData: data,
            })
        })
      })
    })
  }

  public getAssignmentData = (id: string) =>
    new AssignmentDatabase().assignments.get(id)

  public storeAssignmentData = () =>
    this.assignmentPageDOM()
      .then((DOM) => this.assignmentPageTable(DOM))
      .then((table) => this.getAssignmentDataFromTable(table))
      .then((assignmentData) => this.putAssignmentData(assignmentData))
}

export { AssignmentManager, AssignmentData }
