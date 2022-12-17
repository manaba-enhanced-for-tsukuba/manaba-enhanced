import dayjs, { Dayjs } from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"

import { checkLang } from "./checkLang"

dayjs.extend(customParseFormat)

const trans = {
  ja: {
    notSubmitted: "未提出",
    closed: "受付終了",
  },
  en: {
    notSubmitted: "Not submitted",
    closed: "Closed",
  },
}

const colorizeDeadline = ({ checkStatus = false }): void => {
  const now = dayjs()
  const lang = checkLang()

  Array.from<HTMLElement>(assignmentRowElements(document))
    .map((row) => ({
      row,
      deadline: getDeadline(row),
      status: checkStatus ? getStatus(row) : null,
    }))
    .filter(({ deadline }) => deadline)
    .filter(
      ({ status }) =>
        !status ||
        (status &&
          status.includes(trans[lang].notSubmitted) &&
          !status.includes(trans[lang].closed))
    )
    .forEach(({ row, deadline }) => addClassNameToRow(row, deadline, now))
}

const assignmentRowElements = (document: Document) =>
  document.querySelectorAll<HTMLElement>(".row0, .row1, .row")

const getDeadline = (row: HTMLElement) =>
  (row.childNodes[row.childNodes.length - 2] as HTMLElement).innerHTML

const getStatus = (row: HTMLElement) =>
  (row.childNodes[row.childNodes.length - 6] as HTMLElement).innerHTML

const addClassNameToRow = (row: HTMLElement, deadline: string, now: Dayjs) => {
  const target = dayjs(deadline, "YYYY-MM-DD HH:mm")
  const className = classNameFromDiffDays(target.diff(now, "day"))
  if (className) row.classList.add(className)
}

const classNameFromDiffDays = (diffDays: number): string | null =>
  diffDays < 1
    ? "one-day-before"
    : diffDays < 3
    ? "three-days-before"
    : diffDays < 7
    ? "seven-days-before"
    : null

export default colorizeDeadline
