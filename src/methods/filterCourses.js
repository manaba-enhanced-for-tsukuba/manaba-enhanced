"use strict"

import checkLang from "./checkLang.js"
let lang

const filterCourses = () => {
  lang = checkLang()

  const moduleSelector = createModuleSelector()

  chrome.storage.sync.get("filterConfigForModule", (result) => {
    if (result.filterConfigForModule) {
      moduleSelector.value = result.filterConfigForModule
      applyFilter(result.filterConfigForModule)
    }
  })

  moduleSelector.addEventListener("change", (e) => {
    const curModuleCode = e.target.value
    applyFilter(curModuleCode)

    chrome.storage.sync.set({ filterConfigForModule: curModuleCode })
  })
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
    if (moduleCode === "all") {
      if (lang === "ja") {
        return "すべてのモジュール"
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

const applyFilter = (moduleCode) => {
  const coursesContainer = document.querySelector(".courselist tbody")
  const courses = Array.from(coursesContainer.children)
  courses.shift()

  /**
   * Parse course info string on the UI
   * @param {string} courseInfoString Something like "秋A 水5,6" or "Spring AB Mon. 2"
   * @return {{ season: Object.<string, boolean>, module: Array.<string>, dayOfWeek: Object.<string, boolean>, period: Array.<string>}}
   */
  const parseCourseInfoString = (courseInfoString) => {
    if (lang === "ja") {
      const result = courseInfoString.match(
        /^([春秋]+)([abc]+)\s([月火水木金土日]+)([\d,]+)$/i
      )
      return {
        season: {
          spring: result[1].includes("春"),
          autumn: result[1].includes("秋"),
        },
        module: result[2].split("").map((str) => str.toLowerCase()),
        dayOfWeek: {
          mon: result[3].includes("月"),
          tue: result[3].includes("火"),
          wed: result[3].includes("水"),
          thu: result[3].includes("木"),
          fri: result[3].includes("金"),
          sat: result[3].includes("土"),
          sun: result[3].includes("日"),
        },
        period: result[4].split(","),
      }
    } else if (lang === "en") {
      const result = courseInfoString.match(
        /^([Spring|Autumn]+)\s([abc]+)\s([Mon.|Tue.|Wed.|Thu.|Fri.|Sat.|Sun.|\s]+)\s([\d,]+)$/i
      )
      return {
        season: {
          spring: result[1].includes("Spring"),
          autumn: result[1].includes("Autumn"),
        },
        module: result[2].split("").map((str) => str.toLowerCase()),
        dayOfWeek: {
          mon: result[3].includes("Mon"),
          tue: result[3].includes("Tue"),
          wed: result[3].includes("Wed"),
          thu: result[3].includes("Thu"),
          fri: result[3].includes("Fri"),
          sat: result[3].includes("Sat"),
          sun: result[3].includes("Sun"),
        },
        period: result[4].split(","),
      }
    }
  }

  let isOdd = true

  const handleOddRow = (course) => {
    if (isOdd) {
      course.classList.replace("row0", "row1")
    } else {
      course.classList.replace("row1", "row0")
    }
    isOdd = !isOdd
  }

  if (moduleCode !== "all") {
    const parsedModuleCode = parseModuleCode(moduleCode)

    courses.forEach((course) => {
      course.style.display = "table-row"

      const courseInfoString = course.children[2].innerText
      if (/^.+\s.+$/.test(courseInfoString)) {
        const courseInfo = parseCourseInfoString(courseInfoString)

        if (
          courseInfo.season[parsedModuleCode.season] &&
          courseInfo.module.includes(parsedModuleCode.module)
        ) {
          course.style.display = "table-row"
          handleOddRow(course)
        } else {
          course.style.display = "none"
        }
      } else {
        course.style.display = "table-row"
        handleOddRow(course)
      }
    })
  } else {
    courses.forEach((course) => {
      course.style.display = "table-row"
      handleOddRow(course)
    })
  }
}

export default filterCourses
