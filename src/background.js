"use strict"

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "respon",
    type: "normal",
    contexts: ["selection"],
    title: "Open this code in Respon",
  })
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (
    info.menuItemId === "respon" &&
    tab.url.includes("manaba.tsukuba.ac.jp")
  ) {
    chrome.tabs.sendMessage(tab.id, { kind: "open-in-respon" })
  }
})
