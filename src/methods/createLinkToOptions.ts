"use strict"

const createLinkToOptions = (): void => {
  const myLinksContainer = document.getElementById("mylinks")

  const linkContainer = document.createElement("span")

  const linkElm = document.createElement("a")
  linkElm.href = chrome.runtime.getURL("options.html")
  linkElm.target = "_blank"
  linkElm.rel = "noopener noreferer"
  linkElm.innerText = "Enhanced"
  linkElm.style.cursor = "pointer"

  linkElm.addEventListener(
    "click",
    (e) => {
      e.preventDefault()

      chrome.runtime.sendMessage({
        action: "openOptionsPage",
      })
    },
    { passive: false }
  )

  linkContainer.appendChild(linkElm)

  const separater = document.createElement("span")
  separater.innerText = "|"
  separater.classList.add("mylinks-sep")

  if (myLinksContainer) {
    myLinksContainer.insertBefore(
      linkContainer,
      Array.from(myLinksContainer.children).pop() as Node
    )
    myLinksContainer.insertBefore(
      separater,
      Array.from(myLinksContainer.children).pop() as Node
    )
  }
}

export default createLinkToOptions
