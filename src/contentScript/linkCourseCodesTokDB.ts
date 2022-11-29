import { linkCourseCodesTokDB } from "../methods/linkCourseCodesTokDB"
import { getStorage } from "../network/storage"

getStorage({
  kind: "sync",
  keys: "featuresCourseCodesTokDBe",
  callback: ({ featuresCourseCodesTokDB }) => {
    if (featuresCourseCodesTokDB) linkCourseCodesTokDB()
  },
})
