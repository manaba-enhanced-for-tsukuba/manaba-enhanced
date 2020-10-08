"use strict"

import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

const colorizeDeadline = ({ checkStatus = false }) => {
  const now = dayjs()

  const rows = document.querySelectorAll(".row0, .row1, .row")

  const evalDeadline = (row) => {
    const deadline = row.childNodes[row.childNodes.length - 2].innerHTML
    if (deadline) {
      const target = dayjs(deadline, "YYYY-MM-DD HH:mm")
      const diffDays = target.diff(now, "day")

      if (diffDays < 1) {
        row.classList.add("one-day-before")
      } else if (diffDays < 3) {
        row.classList.add("three-days-before")
      } else if (diffDays < 7) {
        row.classList.add("seven-days-before")
      }
    }
  }

  for (const row of rows) {
    if (checkStatus) {
      const status = row.childNodes[row.childNodes.length - 6].innerHTML
      if (
        (status.includes("未提出") && !status.includes("受付終了")) ||
        (status.includes("Not submitted") && !status.includes("Closed"))
      ) {
        evalDeadline(row)
      }
    } else {
      evalDeadline(row)
    }
  }
}

export default colorizeDeadline
