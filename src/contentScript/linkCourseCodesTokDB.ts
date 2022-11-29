import { linkCourseCodesTokDB } from "../methods/linkCourseCodesTokDB"
import { getStorage } from "../network/storage"

getStorage({
  kind: "sync",
  keys: "featuresCourseCodesTokDB",
  callback: ({ featuresCourseCodesTokDB }) => {
    if (featuresCourseCodesTokDB) linkCourseCodesTokDB()
  },
})
