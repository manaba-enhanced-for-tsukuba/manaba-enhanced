"use strict"

import checkLang from "./checkLang.js"

const filterCourses = () => {
  // eslint-disable-next-line no-unused-vars
  const moduleSelector = createModuleSelector()
}

/**
 * Parse module code
 * @param {string} moduleCode Module code: {season-module}
 * @return {{season: string, module: string}}
 */
const parseModuleCode = (moduleCode) => {
  const season = moduleCode.split("-")[0]
  const module = moduleCode.split("-")[1]

  return { season, module }
}

/**
 * Convert season code to the text for UI
 * @param {string} seasonCode "spring" or "autumn"
 * @return {string} "春", "Spring", etc...
 */
const seasonCodeToText = (seasonCode) => {
  const lang = checkLang()

  switch (seasonCode) {
    case "spring": {
      if (lang === "ja") {
        return "春"
      } else if (lang === "en") {
        return "Spring"
      }
      break
    }
    case "autumn": {
      if (lang === "ja") {
        return "秋"
      } else if (lang === "en") {
        return "Autumn"
      }
      break
    }
  }
}

const createModuleSelector = () => {
  const selectorsContainer = document.querySelector(
    ".my-infolist-mycourses .showmore"
  )

  const moduleSelector = document.createElement("select")
  moduleSelector.name = "select"

  const moduleCodes = [
    "all",
    "spring-a",
    "spring-b",
    "spring-c",
    "autumn-a",
    "autumn-b",
    "autumn-c",
  ]

  const moduleCodeToText = (moduleCode) => {
    const lang = checkLang()

    if (moduleCode === "all") {
      if (lang === "ja") {
        return "全てのモジュール"
      } else if (lang === "en") {
        return "All modules"
      }
    }

    const parsedModuleCode = parseModuleCode(moduleCode)

    const season = seasonCodeToText(parsedModuleCode.season)

    return `${season}${parsedModuleCode.module.toUpperCase()}`
  }

  moduleCodes.forEach((moduleCode) => {
    const optionDom = document.createElement("option")
    optionDom.value = moduleCode
    optionDom.innerText = moduleCodeToText(moduleCode)
    if (moduleCode === "all") {
      optionDom.setAttribute("selected", true)
    }

    moduleSelector.appendChild(optionDom)
  })

  selectorsContainer.insertBefore(
    moduleSelector,
    selectorsContainer.childNodes[0]
  )

  return moduleSelector
}

export default filterCourses
