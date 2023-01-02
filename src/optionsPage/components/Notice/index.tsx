import { memo } from "react"

import styles from "./index.module.scss"

const noticeEventTypeValues = ["install", "update"] as const
export type NoticeEventType = typeof noticeEventTypeValues[number]
export const NoticeEventType = {
  is: (str: string): str is NoticeEventType =>
    noticeEventTypeValues.includes(str as never),
}

export type Props = Readonly<{
  event: NoticeEventType
}>

export const Notice = memo<Props>(({ event }) => {
  const versionNumber = chrome.runtime.getManifest().version

  const noticeText =
    event === "install"
      ? `Thanks for installing manaba Enhanced version ${versionNumber}`
      : `manaba Enhanced is updated for version ${versionNumber}`

  return (
    <div className={styles.wrapper}>
      <p className={styles.noticeText}>{noticeText}</p>
    </div>
  )
})
