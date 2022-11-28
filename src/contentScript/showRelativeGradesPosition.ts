import { showRelativeGradesPosition } from "../methods/showRelativeGradesPosition"
import { getStorage } from "../network/storage"

getStorage({
  kind: "sync",
  keys: "featuresRelativeGradesPosition",
  callback: ({ featuresRelativeGradesPosition }) => {
    if (featuresRelativeGradesPosition) showRelativeGradesPosition()
  },
})
