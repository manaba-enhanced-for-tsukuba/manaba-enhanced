"use strict"

import "./style/options.sass"

window.onload = () => {
  const linkToShortcutsSettings = document.getElementById(
    "link-to-shortcuts-settings"
  )
  if (linkToShortcutsSettings) {
    linkToShortcutsSettings.onclick = (e) => {
      e.preventDefault()
      chrome.tabs.create({ url: "chrome://extensions/shortcuts" })
      return false
    }
  }

  Array.from(document.getElementsByClassName("checkbox-features")).map(
    (dom) => {
      const key = dom.id

      chrome.storage.sync.get([key], (result) => {
        if (result[key] === false) {
          dom.checked = false
        }
      })

      dom.addEventListener("change", (event) => {
        chrome.storage.sync.set({ [key]: event.srcElement.checked })
      })
    }
  )
}
