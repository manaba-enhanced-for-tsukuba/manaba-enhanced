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

const enum AsgNegColumn {
  Status = 6,
  Deadline = 2,
}

const getAsgAttrs = (row: HTMLElement, column: AsgNegColumn) =>
  (row.childNodes[row.childNodes.length - column] as HTMLElement).innerText

const getAsgRowElements = (document: Document) =>
  document.querySelectorAll<HTMLElement>(".row0, .row1, .row")

const addClassNameToRow = (row: HTMLElement, deadline: Dayjs, now: Dayjs) => {
  const className = classNameFromDiffDays(deadline.diff(now, "day"))
  if (className) row.classList.add(className)
}

const shouldColorize = (status: string | undefined, lang: checkLang.langCode) =>
  !status ||
  (status.includes(trans[lang].notSubmitted) &&
    !status.includes(trans[lang].closed))

const classNameFromDiffDays = (diffDays: number): string | undefined =>
  [
    { days: 1, className: "one-day-before" },
    { days: 3, className: "three-days-before" },
    { days: 7, className: "seven-days-before" },
  ].find(({ days }) => diffDays < days)?.className

const colorizeDeadline = ({
  checkStatus = false,
  now,
  lang,
}: {
  checkStatus?: boolean
  now: Dayjs
  lang: checkLang.langCode
}): void =>
  Array.from<HTMLElement>(getAsgRowElements(document))
    .map((row) => ({
      row,
      deadline: getAsgAttrs(row, AsgNegColumn.Deadline),
      status: checkStatus ? getAsgAttrs(row, AsgNegColumn.Status) : undefined,
    }))
    .filter(({ deadline }) => deadline)
    .map((attrs) => ({
      ...attrs,
      deadline: dayjs(attrs.deadline, "YYYY-MM-DD HH:mm"),
    }))
    .filter(({ status }) => shouldColorize(status, lang))
    .forEach(({ row, deadline }) => addClassNameToRow(row, deadline, now))

export { colorizeDeadline }
