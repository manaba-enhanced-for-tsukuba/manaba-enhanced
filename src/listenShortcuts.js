"use strict"

chrome.commands.onCommand.addListener((cmd, tab) => {
  switch (cmd) {
    case "manaba-enhanced:open-in-respon": {
      chrome.tabs.sendMessage(tab.id, { kind: "open-in-respon" })
      break
    }
  }
})
