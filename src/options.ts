"use strict"

import "./style/options.sass"

window.onload = () => {
  const query = new URLSearchParams(window.location.search)
  const queryEvent = query.get("event")

  const versionNum = chrome.runtime.getManifest().version

  if (queryEvent && ["install", "update"].includes(queryEvent)) {
    const noticeDom = document.getElementById("notice")
    if (noticeDom && noticeDom.parentElement) {
      noticeDom.parentElement.style.display = "block"

      switch (queryEvent) {
        case "install":
          noticeDom.innerText = `Thanks for installing manaba Enhanced version ${versionNum}`
          break
        case "update":
          noticeDom.innerText = `manaba Enhanced is updated for version ${versionNum}`
          break
      }
    }
  }

  const versionNumDom = document.getElementById("version-number")
  if (versionNumDom) versionNumDom.innerText = versionNum

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

  (Array.from(document.getElementsByClassName("checkbox-features")) as HTMLInputElement[]).map(
    (dom) => {
      const key = dom.id

      chrome.storage.sync.get([key], (result) => {
        if (result[key] === false) {
          dom.checked = false
        }
      })

      dom.addEventListener("change", (event) => {
        const target = event.target as HTMLInputElement
        chrome.storage.sync.set({ [key]: target.checked })
      })
    }
  )
}
