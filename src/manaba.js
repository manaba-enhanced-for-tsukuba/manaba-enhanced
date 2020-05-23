"use strict"

import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

import "./manaba.sass"

window.onload = () => {
  if (
    window.location.href ===
    "https://manaba.tsukuba.ac.jp/ct/home_library_query"
  ) {
    colorizeDeadline()
  }
}

const colorizeDeadline = () => {
  const now = dayjs()

  const rows = document.querySelectorAll(".row0, .row1")

  const evalDeadline = (deadline) => {
    const target = dayjs(deadline, "YYYY-MM-DD HH:mm")
    return now.diff(target, "day")
  }

  for (const row of rows) {
    const deadline = row.childNodes[9].innerHTML
    if (deadline) {
      const diffDays = evalDeadline(deadline)

      if (diffDays > -1) {
        row.classList.add("one-day-before")
      } else if (diffDays > -3) {
        row.classList.add("three-days-before")
      } else if (diffDays > -7) {
        row.classList.add("seven-days-before")
      }
    }
  }
}
