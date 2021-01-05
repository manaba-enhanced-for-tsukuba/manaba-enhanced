"use strict"

import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

import checkLang from "./checkLang"
import evalDiff from "./evalDiff"

const checkAssignmentDeadline = (): void => {
  let notSubmitted = false
  let deadlineString = ""
  let deadlineTh: HTMLElement

  const ths = Array.from(
    document.querySelectorAll(".stdlist th")
  ) as HTMLElement[]
  for (const th of ths) {
    if (th.innerText === "状態" || th.innerText === "Status") {
      if (th.nextElementSibling) {
        const innerText = (th.nextElementSibling as HTMLElement).innerText
        if (
          innerText.includes("提出していません") ||
          innerText.includes("Not submitted")
        ) {
          notSubmitted = true
        }
      }
    }
    if (th.innerText === "受付終了日時" || th.innerText === "End") {
      if (th.nextElementSibling) {
        deadlineString = (th.nextElementSibling as HTMLElement).innerText
        deadlineTh = th
      }
    }
  }

  const validateDeadlineString = (string: string) => {
    const match = new RegExp("(\\d{4}-+\\d{2}-+\\d{2} \\d{2}:+\\d{2})", "g")
    return match.test(string)
  }

  if (notSubmitted && validateDeadlineString(deadlineString)) {
    const now = dayjs()
    const deadline = dayjs(deadlineString, "YYYY-MM-DD HH:mm")

    const lang = checkLang()

    const createMessage = (
      text: string,
      msgStatus: "normal" | "caution" | "danger"
    ) => {
      const message = document.createElement("span")
      message.innerText = text
      message.style.marginLeft = "1em"
      message.style.padding = ".2em .5em"
      if (msgStatus === "normal") {
        message.style.backgroundColor = "#d3ebd3"
        message.style.color = "#244f24"
      } else if (msgStatus === "caution") {
        message.style.backgroundColor = "#fff4d1"
        message.style.color = "#433200"
      } else if (msgStatus === "danger") {
        message.style.backgroundColor = "#ffdce0"
        message.style.color = "#5d000b"
      }
      if (deadlineTh && deadlineTh.nextElementSibling) {
        deadlineTh.nextElementSibling.appendChild(message)
      }
    }

    const diff = evalDiff(now, deadline)

    if (diff.value > 0) {
      switch (diff.unit) {
        case "day":
          switch (lang) {
            case "ja":
              createMessage(
                `あと${diff.value}日`,
                diff.value > 2 ? "normal" : "caution"
              )
              break
            case "en":
              createMessage(
                diff.value > 1
                  ? `${diff.value} days remaining`
                  : `${diff.value} day remaining`,
                diff.value > 2 ? "normal" : "caution"
              )
              break
          }
          break
        case "hour":
          switch (lang) {
            case "ja":
              createMessage(`あと${diff.value}時間`, "danger")
              break
            case "en":
              createMessage(
                diff.value > 1
                  ? `${diff.value} hours remaining`
                  : `${diff.value} hour remaining`,
                "danger"
              )
              break
          }
          break
        case "minute":
          switch (lang) {
            case "ja":
              createMessage(`あと${diff.value}分`, "danger")
              break
            case "en":
              createMessage(
                diff.value > 1
                  ? `${diff.value} minutes remaining`
                  : `${diff.value} minute remaining`,
                "danger"
              )
              break
          }
      }
    } else {
      switch (lang) {
        case "ja":
          createMessage("受付終了", "danger")
          break
        case "en":
          createMessage("Deadline is over", "danger")
          break
      }
    }
  }
}

export default checkAssignmentDeadline
