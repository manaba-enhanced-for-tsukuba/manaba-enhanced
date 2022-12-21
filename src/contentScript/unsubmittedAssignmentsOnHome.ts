import {
  fetchAssignments,
  renderUnsubmittedAsgsOnHome,
} from "../methods/unsubmittedAssignmentsOnHome"
import { getStorage } from "../network/storage"

getStorage({
  kind: "sync",
  keys: "featuresUnsubmittedAssignmentsOnHome",
  callback: ({ featuresUnsubmittedAssignmentsOnHome }) => {
    if (featuresUnsubmittedAssignmentsOnHome)
      fetchAssignments().then(
        (assignments) =>
          assignments &&
          assignments.length &&
          renderUnsubmittedAsgsOnHome(assignments, document)
      )
  },
})
