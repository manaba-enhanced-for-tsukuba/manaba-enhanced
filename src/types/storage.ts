import type { ModuleCode } from "./filterCources"

export type StorageKind = "sync" | "local"

export type StorageSync = Readonly<{
  featuresAssignmentsColoring?: boolean
  featuresDeadlineHighlighting?: boolean
  featuresAutoSaveReports?: boolean
  featuresRemoveConfirmation?: boolean
  featuresFilterCourses?: boolean
  featuresDragAndDrop: boolean
  featuresReportTemplate: boolean
  featuresDisableForceFileSaving?: boolean
  featuresRelativeGradesPosition?: boolean
  filterConfigForModule?: ModuleCode
  featuresCourseCodesTokDB?: boolean
  reportTemplate?: string
  reportFilename?: string
}>

export type StorageLocal = Readonly<{
  reportText?: {
    [reportId: string]: {
      modified: number
      text: string
    }
  }
}>
