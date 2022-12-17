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

type Feature = typeof Feature[number]

export { Feature }
