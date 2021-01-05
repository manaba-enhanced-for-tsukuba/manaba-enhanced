"use strict"

import dayjs from "dayjs"

interface diff {
  value: number
  unit: "day" | "hour" | "minute" | ""
}

const evalDiff = (now: dayjs.Dayjs, deadline: dayjs.Dayjs): diff => {
  const diffDays = deadline.diff(now, "day")
  if (diffDays > 0) {
    return { value: diffDays, unit: "day" }
  } else {
    const diffHours = deadline.diff(now, "hour")
    if (diffHours > 0) {
      return { value: diffHours, unit: "hour" }
    } else {
      const diffMinutes = deadline.diff(now, "minute") + 1
      if (diffMinutes >= 0) {
        return { value: diffMinutes, unit: "minute" }
      } else {
        return { value: -1, unit: "" }
      }
    }
  }
}

export default evalDiff
