"use strict"

import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"
dayjs.extend(customParseFormat)

window.addEventListener("DOMContentLoaded", () => {
  removeLinkBalloon()

  const pageLimitView = document.getElementsByClassName("pagelimitview")[0]
  if (pageLimitView) {
    checkPagePubDeadline(pageLimitView)
  }

  const stdlist = document.getElementsByClassName("stdlist")[0]
  if (stdlist) {
    checkAssignmentDeadline()
  }
})

const removeLinkBalloon = () => {
  const links = document.getElementsByTagName("a")

  const urlClamp = (url) => {
    if (url.length > 100) {
      return `${url.substr(0, 75)}...`
    } else {
      return url
    }
  }

  for (const link of links) {
    if (link.href.indexOf("link_iframe_balloon") !== -1) {
      const linkNew = document.createElement("a")
      const url = unescape(link.href.substr(56))
      linkNew.href = url
      linkNew.innerHTML =
        link.innerHTML.indexOf("http") === -1 ? link.innerHTML : urlClamp(url)
      linkNew.target = "_blank"
      linkNew.rel = "noopener noreferrer"

      link.parentElement.insertBefore(linkNew, link)
      link.remove()
    }
  }
}

const checkLang = () => {
  const mylang = document.getElementById("mylang")
  if (mylang.className.indexOf("ja") !== -1) {
    return "ja"
  } else if (mylang.className.indexOf("en") !== -1) {
    return "en"
  }
}

const evalDiff = (now, deadline) => {
  const diffDays = deadline.diff(now, "day")
  if (diffDays > 0) {
    return { value: diffDays, unit: "day" }
  } else {
    const diffHours = deadline.diff(now, "hour")
    if (diffHours > 0) {
      return { value: diffHours, unit: "hour" }
    } else {
      const diffMinutes = deadline.diff(now, "minute") + 1
      if (diffMinutes >= 0) {
        return { value: diffMinutes, unit: "minute" }
      } else {
        return { value: -1, unit: "" }
      }
    }
  }
}

const checkPagePubDeadline = (div) => {
  div.innerText = "公開期間: 2020-06-12 22:45:00 ～ 2020-06-17 20:40:00"
  const match = new RegExp(
    "(\\d{4}-+\\d{2}-+\\d{2} \\d{2}:+\\d{2}:+\\d{2})",
    "g"
  )

  const timeStrings = div.innerText.match(match)

  if (timeStrings.length === 2) {
    const deadlineString = timeStrings[1]

    const now = dayjs()
    const deadline = dayjs(deadlineString, "YYYY-MM-DD HH:mm:ss")

    const lang = checkLang()

    const createMessage = (text, caution) => {
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

    const diff = evalDiff(now, deadline, createMessage)

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

const checkAssignmentDeadline = () => {
  let notSubmitted, deadlineString, deadlineTh

  const ths = document.querySelectorAll(".stdlist th")
  for (const th of ths) {
    if (th.innerText === "状態" || th.innerText === "Status") {
      if (th.nextElementSibling) {
        const innerText = th.nextElementSibling.innerText
        if (
          innerText.indexOf("提出していません") !== -1 ||
          innerText.indexOf("Not submitted") !== -1
        ) {
          notSubmitted = true
        }
      }
    }
    if (th.innerText === "受付終了日時" || th.innerText === "End") {
      if (th.nextElementSibling) {
        deadlineString = th.nextElementSibling.innerText
        deadlineTh = th
      }
    }
  }

  if (notSubmitted) {
    const now = dayjs()
    const deadline = dayjs(deadlineString, "YYYY-MM-DD HH:mm")

    const lang = checkLang()

    const createMessage = (text, msgStatus) => {
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
      deadlineTh.nextElementSibling.appendChild(message)
    }

    const diff = evalDiff(now, deadline, createMessage)

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
