const Feature = [
  "featuresAssignmentsColoring",
  "featuresAutoSaveReports",
  "featuresDeadlineHighlighting",
  "featuresRemoveConfirmation",
  "featuresFilterCourses",
  "featuresDragAndDrop",
  "featuresReportTemplate",
  "featuresRelativeGradesPosition",
  "featuresDisableForceFileSaving",
] as const

type Feature = (typeof Feature)[number]

const isFeature = (key: string): key is Feature => key in Feature

export { Feature, isFeature }
