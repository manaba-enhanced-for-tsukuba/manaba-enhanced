"use strict"

const removeLinkBalloon = () => {
  const links = document.getElementsByTagName("a")

  const urlClamp = (url) => {
    if (url.length > 100) {
      return `${url.substr(0, 75)}...`
    } else {
      return url
    }
  }

  for (const link of links) {
    if (link.href.includes("link_iframe_balloon")) {
      const linkNew = document.createElement("a")
      const url = unescape(link.href.substr(56))
      linkNew.href = url
      linkNew.innerHTML = !link.innerHTML.includes("http")
        ? link.innerHTML
        : urlClamp(url)
      linkNew.target = "_blank"
      linkNew.rel = "noopener noreferrer"

      link.parentElement.insertBefore(linkNew, link)
      link.remove()
    }
  }
}

export default removeLinkBalloon
