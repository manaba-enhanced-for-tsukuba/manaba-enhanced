"use strict"

import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

import checkLang from "./checkLang"
import evalDiff from "./evalDiff"

const checkPagePubDeadline = (div: HTMLElement): void => {
  const match = new RegExp(
    "(\\d{4}-+\\d{2}-+\\d{2} \\d{2}:+\\d{2}:+\\d{2})",
    "g"
  )

  const timeStrings = div.innerText.match(match)

  if (timeStrings && timeStrings.length === 2) {
    const deadlineString = timeStrings[1]

    const now = dayjs()
    const deadline = dayjs(deadlineString, "YYYY-MM-DD HH:mm:ss")

    const lang = checkLang()

    const createMessage = (text: string, caution: boolean) => {
      const message = document.createElement("span")
      message.innerText = text
      message.style.marginLeft = "1em"
      message.style.padding = ".2em .5em"
      if (!caution) {
        message.style.backgroundColor = "#d3ebd3"
        message.style.color = "#244f24"
      } else {
        message.style.backgroundColor = "#ffdce0"
        message.style.color = "#5d000b"
      }
      div.appendChild(message)
    }

    const diff = evalDiff(now, deadline)

    if (diff.value > 0) {
      switch (diff.unit) {
        case "day":
          switch (lang) {
            case "ja":
              createMessage(
                `あと${diff.value}日`,
                diff.value > 7 ? false : true
              )
              break
            case "en":
              createMessage(
                diff.value > 1
                  ? `${diff.value} days remaining`
                  : `${diff.value} day remaining`,
                diff.value > 7 ? false : true
              )
              break
          }
          break
        case "hour":
          switch (lang) {
            case "ja":
              createMessage(`あと${diff.value}時間`, true)
              break
            case "en":
              createMessage(
                diff.value > 1
                  ? `${diff.value} hours remaining`
                  : `${diff.value} hour remaining`,
                true
              )
              break
          }
          break
        case "minute":
          switch (lang) {
            case "ja":
              createMessage(`あと${diff.value}分`, true)
              break
            case "en":
              createMessage(
                diff.value > 1
                  ? `${diff.value} minutes remaining`
                  : `${diff.value} minute remaining`,
                true
              )
              break
          }
          break
      }
    } else {
      switch (lang) {
        case "ja":
          createMessage("公開終了", true)
          break
        case "en":
          createMessage("Deadline is over", true)
          break
      }
    }
  }
}

export default checkPagePubDeadline
