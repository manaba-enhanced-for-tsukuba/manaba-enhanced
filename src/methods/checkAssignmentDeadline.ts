"use strict"

import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"

import { checkLang } from "./checkLang"
import evalDiff from "./evalDiff"

dayjs.extend(customParseFormat)

const checkAssignmentDeadline = (): void => {
  const lang = checkLang()

  const ths = Array.from(
    document.querySelectorAll(".stdlist th")
  ) as HTMLElement[]

  const notSubmitted = (
    ths.find(
      (th) => th.innerText === trans[lang].status && th.nextElementSibling
    )?.nextElementSibling as HTMLElement
  )?.innerText.includes(trans[lang].notSubmitted)

  const deadlineString = (
    ths.find(
      (th) => th.innerText === trans[lang].deadline && th.nextElementSibling
    )?.nextElementSibling as HTMLElement
  )?.innerText

  const deadlineTh = ths.find(
    (th) => th.innerText === trans[lang].deadline && th.nextElementSibling
  )
  if (!deadlineTh) return

  if (notSubmitted && validateDeadlineString(deadlineString)) {
    const now = dayjs()
    const deadline = dayjs(deadlineString, "YYYY-MM-DD HH:mm")
    const lang = checkLang()

    const diff = evalDiff(now, deadline)
    if (!diff.unit) return

    createMessageOnDiff(diff, lang, deadlineTh)
  }
}

const trans = {
  ja: {
    status: "状態",
    notSubmitted: "提出していません",
    deadline: "受付終了日時",
    day: "日",
    hour: "時間",
    minute: "分",
    remaining: (number: number, unit: "day" | "hour" | "minute") =>
      `あと${number}${trans.ja[unit]}`,
    deadlineOver: "受付終了",
  },
  en: {
    status: "Status",
    notSubmitted: "Not submitted",
    deadline: "End",
    day: "day",
    hour: "hour",
    minute: "minute",
    remaining: (number: number, unit: "day" | "hour" | "minute") =>
      number > 1
        ? `${number} ${trans.en[unit]}s remaining`
        : `${number} ${trans.en[unit]} remaining`,
    deadlineOver: "Deadline is over",
  },
}

const messageStyle = {
  normal: {
    backgroundColor: "#d3ebd3",
    color: "#244f24",
  },
  caution: {
    backgroundColor: "#fff4d1",
    color: "#433200",
  },
  danger: {
    backgroundColor: "#ffdce0",
    color: "#5d000b",
  },
}

const validateDeadlineString = (string: string) =>
  new RegExp("(\\d{4}-+\\d{2}-+\\d{2} \\d{2}:+\\d{2})", "g").test(string)

const createMessage = (
  text: string,
  msgStatus: "normal" | "caution" | "danger",
  deadlineTh: HTMLElement
) => {
  const message = document.createElement("span")
  message.innerText = text
  message.style.marginLeft = "1em"
  message.style.padding = ".2em .5em"
  message.style.backgroundColor = messageStyle[msgStatus].backgroundColor
  message.style.color = messageStyle[msgStatus].color
  if (deadlineTh && deadlineTh.nextElementSibling)
    deadlineTh.nextElementSibling.appendChild(message)
}

const createMessageOnDiff = (
  diff: ReturnType<typeof evalDiff>,
  lang: checkLang.langCode,
  deadlineTh: HTMLElement
) =>
  diff.unit &&
  (diff.value > 0
    ? createMessage(
        trans[lang].remaining(diff.value, diff.unit),
        diff.unit === "day"
          ? diff.value > 2
            ? "normal"
            : "caution"
          : "danger",
        deadlineTh
      )
    : createMessage(trans[lang].deadlineOver, "danger", deadlineTh))

export default checkAssignmentDeadline
