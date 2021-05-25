import type { ModuleCode } from "./filterCources"

export type StorageSync = Readonly<{
  "features-assignments-coloring": boolean
  "features-autosave-reports": boolean
  "features-deadline-highlighting": boolean
  "features-remove-confirmation": boolean
  "features-filter-courses": boolean
  featuresDragAndDrop: boolean
  filterConfigForModule?: ModuleCode
}>
