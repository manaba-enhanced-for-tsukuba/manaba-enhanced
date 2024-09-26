import { Feature } from "./feature"
import type { ModuleCode } from "./filterCources"

export type StorageKind = "sync" | "local"

export type StorageSync = Readonly<
  { [key in Feature]?: boolean } & {
    filterConfigForModule?: ModuleCode
    reportTemplate?: string
    reportFilename?: string
  }
>

export type StorageLocal = Readonly<{
  reportText?: {
    [reportId: string]: {
      modified: number
      text: string
    }
  }
}>
