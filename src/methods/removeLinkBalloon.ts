"use strict"

const removeLinkBalloon = (): void => {
  const links = document.getElementsByTagName("a")

  const urlClamp = (url: string) => {
    if (url.length > 100) {
      return `${url.substr(0, 75)}...`
    } else {
      return url
    }
  }

  for (const link of Array.from(links)) {
    if (link.href.includes("link_iframe_balloon")) {
      const linkNew = document.createElement("a")
      const url = unescape(link.href.substr(56))
      linkNew.href = url
      linkNew.innerHTML = !link.innerHTML.includes("http")
        ? link.innerHTML
        : urlClamp(url)
      linkNew.target = "_blank"
      linkNew.rel = "noopener noreferrer"

      if (link.parentElement) link.parentElement.insertBefore(linkNew, link)
      link.remove()
    }
  }
}

export default removeLinkBalloon
