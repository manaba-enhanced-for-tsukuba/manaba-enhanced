"use strict"

import { getStorage, setStorage } from "../network/storage"
import type { SeasonCode, ModuleCode } from "../types/filterCources"

import { checkLang } from "./checkLang"

let lang: checkLang.langCode

type ViewMode = "list" | "thumbnail"

const translations = {
  ja: {
    spring: "春",
    autumn: "秋",
    allModules: "すべてのモジュール",
    courseInfoRegex: /^([春秋])([abc]+)/i,
  },
  en: {
    spring: "Spring",
    autumn: "Autumn",
    allModules: "All modules",
    courseInfoRegex: /^(Spring|Autumn)\s([abc]+)/i,
  },
}

export const filterCourses = (): void => {
  lang = checkLang()

  const moduleSelector = createModuleSelector()

  getStorage({
    kind: "sync",
    keys: "filterConfigForModule",
    callback: (storage) => {
      if (storage.filterConfigForModule) {
        moduleSelector.value = storage.filterConfigForModule as ModuleCode
        applyFilter(storage.filterConfigForModule)
      }
    },
  })

  moduleSelector.addEventListener("change", (e) => {
    if (e.target) {
      const curModuleCode = (e.target as HTMLSelectElement).value as ModuleCode
      applyFilter(curModuleCode)

      setStorage({
        kind: "sync",
        items: {
          filterConfigForModule: curModuleCode,
        },
      })
    }
  })
}

/**
 * Parse module code
 * @param {string} moduleCode Module code: {season-module}
 */
const parseModuleCode = (
  moduleCode: ModuleCode
): { season: SeasonCode; module: ModuleCode } => ({
  season: moduleCode.split("-")[0] as SeasonCode,
  module: moduleCode.split("-")[1] as ModuleCode,
})

/**
 * Convert season code to the text for UI according to the display language
 * @param {string} lang
 * @param {string} seasonCode "spring" or "autumn"
 * @return {string} "春", "Spring", etc...
 */
const seasonCodeToText = (
  lang: checkLang.langCode,
  seasonCode: SeasonCode
): string => translations[lang][seasonCode]

const createModuleSelector = () => {
  const selectorsContainer = document.querySelector(
    ".my-infolist-mycourses .showmore"
  )

  const moduleSelector = document.createElement("select")
  moduleSelector.name = "select"

  const moduleCodes: ModuleCode[] = [
    "all",
    "spring-a",
    "spring-b",
    "spring-c",
    "autumn-a",
    "autumn-b",
    "autumn-c",
  ]

  moduleCodes.forEach((moduleCode: ModuleCode) => {
    const optionDom = document.createElement("option")
    optionDom.value = moduleCode
    optionDom.innerText = moduleCodeToText(moduleCode)
    if (moduleCode === "all") optionDom.setAttribute("selected", "true")

    moduleSelector.appendChild(optionDom)
  })

  if (selectorsContainer)
    selectorsContainer.insertBefore(
      moduleSelector,
      selectorsContainer.childNodes[0]
    )

  return moduleSelector
}

const getViewModeQuery = () =>
  document
    .querySelector<HTMLAnchorElement>(".my-infolist-mycourses .current a")
    ?.href.split("?")
    .pop()

const applyFilter = (moduleCode: ModuleCode): void => {
  const coursesListContainer =
    document.querySelector<HTMLElement>(".courselist tbody")
  const coursesThumbnailContainer = document.querySelector<HTMLElement>(
    ".mycourses-body .section"
  )
  const coursesContainer = coursesListContainer ?? coursesThumbnailContainer
  const viewMode = new URLSearchParams(getViewModeQuery()).get(
    "chglistformat"
  ) as ViewMode | null

  if (!coursesContainer || !viewMode) return

  const courses = getCourses(coursesContainer, viewMode)

  let isOddRow = true

  const handleOddRow = (course: HTMLElement) => {
    isOddRow
      ? course.classList.replace("row0", "row1")
      : course.classList.replace("row1", "row0")
    isOddRow = !isOddRow
  }

  const showCourse = (viewMode: ViewMode, course: HTMLElement) => {
    course.style.display = viewMode === "list" ? "table-row" : "block"
    if (viewMode === "list") handleOddRow(course)
  }

  const hideCourse = (course: HTMLElement) => (course.style.display = "none")

  if (moduleCode !== "all") {
    const parsedModuleCode = parseModuleCode(moduleCode)

    courses.forEach((course) => {
      if (viewMode === "list") course.style.display = "table-row"

      const courseInfoString = getCourseInfoString(viewMode, course)

      if (/^.+\s.+$/.test(courseInfoString)) {
        const courseInfo = parseCourseInfoString(courseInfoString, lang)

        courseInfo &&
        courseInfo.season[parsedModuleCode.season] &&
        courseInfo.module.includes(parsedModuleCode.module)
          ? showCourse(viewMode, course)
          : hideCourse(course)
      } else showCourse(viewMode, course)
    })
  } else courses.forEach((course) => showCourse(viewMode, course))
}

const getCourses = (coursesContainer: HTMLElement, viewMode: ViewMode) =>
  (Array.from(coursesContainer.children) as HTMLElement[]).filter(
    (_, i) =>
      i !==
      rowIndexToBeExcluded(viewMode, coursesContainer.childElementCount - 1)
  )

const rowIndexToBeExcluded = (viewMode: ViewMode, lastIndex: number) =>
  viewMode === "list" ? 0 : lastIndex

const getCourseInfoString = (viewmode: ViewMode, course: HTMLElement) => {
  switch (viewmode) {
    case "list":
      return (course.children[2] as HTMLElement).innerText
    case "thumbnail": {
      const courseInfoStringElm = course.querySelector<HTMLElement>(
        ".courseitemdetail-date span"
      )
      return courseInfoStringElm ? courseInfoStringElm.title : ""
    }
  }
}

/**
 * Parse course info string on the UI
 * @param {string} courseInfoString Something like "秋A 水5,6" or "Spring AB Mon. 2"
 * @return {{ season: Object.<string, boolean>, module: Array.<string>, dayOfWeek: Object.<string, boolean>, period: Array.<string>}}
 */
const parseCourseInfoString = (
  courseInfoString: string,
  lang: checkLang.langCode
): {
  season: { [key in SeasonCode]: boolean }
  module: string[]
} | void => {
  const courseInfoRegex = translations[lang].courseInfoRegex
  const match = courseInfoString.match(courseInfoRegex)
  if (!courseInfoRegex.test(courseInfoString) || !match) return

  const [, season, module] = match

  return {
    season: {
      spring: season.includes(translations[lang].spring),
      autumn: season.includes(translations[lang].autumn),
    },
    module: module.split("").map((str) => str.toLowerCase()),
  }
}

const moduleCodeToText = (moduleCode: ModuleCode) => {
  if (moduleCode === "all") return translations[lang].allModules

  const parsedModuleCode = parseModuleCode(moduleCode)
  const season = seasonCodeToText(lang, parsedModuleCode.season)

  return `${season}${parsedModuleCode.module.toUpperCase()}`
}
