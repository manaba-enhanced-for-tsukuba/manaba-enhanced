/**
 * @see {@link https://developer.chrome.com/docs/extensions/reference/notifications/#type-NotificationOptions | Chrome Notifications API}
 */

import { AssignmentData } from "../methods/AssignmentSync"

import { getCurrentTab } from "./main"

const setAssignmentNotification = (data: AssignmentData) =>
  data.id &&
  data.deadline &&
  chrome.alarms.create(data.id, {
    when: calcNotificationTime(new Date(data.deadline), 1),
  })

const createAssignmentNotification = (data: AssignmentData) =>
  data.id &&
  data.deadline &&
  chrome.notifications.create(data.id, {
    type: "basic",
    iconUrl: "icons/icon_128.png",
    title: `${data.course}`,
    contextMessage: `${data.title}`,
    message: `${new Date(data.deadline).toLocaleString()}が期限です。タイプは${
      data.type
    }です。\nクリックして詳細を確認できます。`,
    buttons: [
      {
        title: "manabaを開く",
      },
    ],
  })

const calcNotificationTime = (deadline: Date, timeDay: number): number =>
  deadline.getTime() - 1000 * 60 * 60 * 24 * timeDay

const createManabaTab = (notificationId: string) =>
  chrome.tabs.create({
    url: `https://manaba.tsukuba.ac.jp/ct/${notificationId}`,
  })

chrome.runtime.onMessage.addListener(
  ({ action, assignmentData }) =>
    action === "assignmentDeadlineNotification" &&
    setAssignmentNotification(assignmentData)
)

chrome.alarms.onAlarm.addListener(({ name }) =>
  getCurrentTab((tab: chrome.tabs.Tab) =>
    chrome.tabs.sendMessage(
      tab.id || 0,
      {
        kind: "getAssignmentData",
        id: name,
      },
      (data: AssignmentData) => createAssignmentNotification(data)
    )
  )
)

// TODO: Avoidance of the `notificationId` collision of event listeners for `chrome.notifications`.
chrome.notifications.onButtonClicked.addListener((notificationId) =>
  createManabaTab(notificationId)
)

chrome.notifications.onClicked.addListener((notificationId) =>
  createManabaTab(notificationId)
)
