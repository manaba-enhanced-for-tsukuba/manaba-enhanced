"use strict"

window.addEventListener("DOMContentLoaded", () => {
  removeLinkBalloon()
})

const removeLinkBalloon = () => {
  const links = document.getElementsByTagName("a")

  const urlClamp = (url) => {
    if (url.length > 100) {
      return `${url.substr(0, 75)}…`
    } else {
      return url
    }
  }

  for (const link of links) {
    if (link.href.indexOf("link_iframe_balloon") !== -1) {
      const linkNew = document.createElement("a")
      const url = unescape(link.href.substr(56))
      linkNew.href = url
      linkNew.innerHTML =
        link.innerHTML.indexOf("http") === -1 ? link.innerHTML : urlClamp(url)
      linkNew.target = "_blank"
      linkNew.rel = "noopener noreferrer"

      link.parentElement.insertBefore(linkNew, link)
      link.remove()
    }
  }
}
