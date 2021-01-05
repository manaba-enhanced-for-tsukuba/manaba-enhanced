"use strict"

import checkLang from "./checkLang"
let lang: "en" | "ja"

type seasonCode = "spring" | "autumn"

type moduleCode =
  | "all"
  | "spring-a"
  | "spring-b"
  | "spring-c"
  | "autumn-a"
  | "autumn-b"
  | "autumn-c"

const filterCourses = (): void => {
  lang = checkLang()

  const moduleSelector = createModuleSelector()

  chrome.storage.sync.get("filterConfigForModule", (result) => {
    if (result.filterConfigForModule) {
      moduleSelector.value = result.filterConfigForModule as moduleCode
      applyFilter(result.filterConfigForModule)
    }
  })

  moduleSelector.addEventListener("change", (e) => {
    if (e.target) {
      const curModuleCode = (e.target as HTMLInputElement).value as moduleCode
      applyFilter(curModuleCode)

      chrome.storage.sync.set({ filterConfigForModule: curModuleCode })
    }
  })
}

/**
 * Parse module code
 * @param {string} moduleCode Module code: {season-module}
 * @return {{season: string, module: string}}
 */
const parseModuleCode = (moduleCode: moduleCode) => {
  const season = moduleCode.split("-")[0] as seasonCode
  const module = moduleCode.split("-")[1] as moduleCode

  return { season, module }
}

/**
 * Convert season code to the text for UI according to the display language
 * @param {string} seasonCode "spring" or "autumn"
 * @return {string} "春", "Spring", etc...
 */
const seasonCodeToText = (seasonCode: seasonCode) => {
  switch (seasonCode) {
    case "spring": {
      if (lang === "ja") {
        return "春"
      } else if (lang === "en") {
        return "Spring"
      } else {
        return ""
      }
      break
    }
    case "autumn": {
      if (lang === "ja") {
        return "秋"
      } else if (lang === "en") {
        return "Autumn"
      } else {
        return ""
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

  const moduleCodes: moduleCode[] = [
    "all",
    "spring-a",
    "spring-b",
    "spring-c",
    "autumn-a",
    "autumn-b",
    "autumn-c",
  ]

  const moduleCodeToText = (moduleCode: moduleCode) => {
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

  moduleCodes.forEach((moduleCode: moduleCode) => {
    const optionDom = document.createElement("option")
    optionDom.value = moduleCode
    optionDom.innerText = moduleCodeToText(moduleCode)
    if (moduleCode === "all") {
      optionDom.setAttribute("selected", "true")
    }

    moduleSelector.appendChild(optionDom)
  })

  if (selectorsContainer) {
    selectorsContainer.insertBefore(
      moduleSelector,
      selectorsContainer.childNodes[0]
    )
  }

  return moduleSelector
}

const applyFilter = (moduleCode: moduleCode): void => {
  let viewMode: "list" | "thumbnail"
  let courses: HTMLElement[]

  const coursesListContainer = document.querySelector(".courselist tbody")
  const coursesThumbnailContainer = document.querySelector(
    ".mycourses-body .section"
  )

  if (coursesListContainer) {
    viewMode = "list"

    courses = Array.from(coursesListContainer.children) as HTMLElement[]
    courses.shift()
  } else if (coursesThumbnailContainer) {
    viewMode = "thumbnail"

    courses = Array.from(coursesThumbnailContainer.children) as HTMLElement[]
    courses.pop()
  } else {
    throw "invalid viewMode"
  }

  /**
   * Parse course info string on the UI
   * @param {string} courseInfoString Something like "秋A 水5,6" or "Spring AB Mon. 2"
   * @return {{ season: Object.<string, boolean>, module: Array.<string>, dayOfWeek: Object.<string, boolean>, period: Array.<string>}}
   */
  const parseCourseInfoString = (courseInfoString: string) => {
    if (lang === "ja") {
      const splitted = courseInfoString.match(
        /^([春秋]+)([abc]+)\s([月火水木金土日]+)([\d,]+)$/i
      )
      if (splitted && splitted.length >= 4) {
        return {
          season: {
            spring: splitted[1].includes("春"),
            autumn: splitted[1].includes("秋"),
          },
          module: splitted[2].split("").map((str) => str.toLowerCase()),
          dayOfWeek: {
            mon: splitted[3].includes("月"),
            tue: splitted[3].includes("火"),
            wed: splitted[3].includes("水"),
            thu: splitted[3].includes("木"),
            fri: splitted[3].includes("金"),
            sat: splitted[3].includes("土"),
            sun: splitted[3].includes("日"),
          },
          period: splitted[4].split(","),
        }
      } else {
        throw "invalid courseInfoString"
      }
    } else if (lang === "en") {
      const splitted = courseInfoString.match(
        /^([Spring|Autumn]+)\s([abc]+)\s([Mon.|Tue.|Wed.|Thu.|Fri.|Sat.|Sun.|\s]+)\s([\d,]+)$/i
      )
      if (splitted && splitted.length >= 4) {
        return {
          season: {
            spring: splitted[1].includes("Spring"),
            autumn: splitted[1].includes("Autumn"),
          },
          module: splitted[2].split("").map((str) => str.toLowerCase()),
          dayOfWeek: {
            mon: splitted[3].includes("Mon"),
            tue: splitted[3].includes("Tue"),
            wed: splitted[3].includes("Wed"),
            thu: splitted[3].includes("Thu"),
            fri: splitted[3].includes("Fri"),
            sat: splitted[3].includes("Sat"),
            sun: splitted[3].includes("Sun"),
          },
          period: splitted[4].split(","),
        }
      } else {
        throw "invalid courseInfoString"
      }
    } else {
      throw "invalid lang"
    }
  }

  let isOddRow = true

  const handleOddRow = (course: HTMLElement) => {
    if (isOddRow) {
      course.classList.replace("row0", "row1")
    } else {
      course.classList.replace("row1", "row0")
    }
    isOddRow = !isOddRow
  }

  const showCourse = (course: HTMLElement) => {
    if (viewMode === "list") {
      course.style.display = "table-row"
      handleOddRow(course)
    } else if (viewMode === "thumbnail") {
      course.style.display = "block"
    }
  }

  const hideCourse = (course: HTMLElement) => {
    course.style.display = "none"
  }

  if (moduleCode !== "all") {
    const parsedModuleCode = parseModuleCode(moduleCode)

    courses.forEach((course) => {
      let courseInfoString: string

      if (viewMode === "list") {
        course.style.display = "table-row"
      }

      if (viewMode === "list") {
        courseInfoString = (course.children[2] as HTMLElement)
          .innerText as string
      } else if (viewMode === "thumbnail") {
        const courseInfoStringElm = course.querySelector(
          ".courseitemdetail-date span"
        ) as HTMLElement

        if (courseInfoStringElm) {
          courseInfoString = courseInfoStringElm.title
        } else {
          courseInfoString = ""
        }
      } else {
        throw "invalid viewMode"
      }

      if (/^.+\s.+$/.test(courseInfoString)) {
        const courseInfo = parseCourseInfoString(courseInfoString)

        if (
          courseInfo.season[parsedModuleCode.season] &&
          courseInfo.module.includes(parsedModuleCode.module)
        ) {
          showCourse(course)
        } else {
          hideCourse(course)
        }
      } else {
        showCourse(course)
      }
    })
  } else {
    courses.forEach((course) => {
      showCourse(course)
    })
  }
}

export default filterCourses
