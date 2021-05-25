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

  const hrefBalloonKeyword = "link_iframe_balloon?url="

  Array.from(links).map((link) => {
    if (link.href.includes(hrefBalloonKeyword)) {
      const linkNew = document.createElement("a")

      try {
        const url = decodeURIComponent(
          link.href.slice(
            link.href.indexOf(hrefBalloonKeyword) + hrefBalloonKeyword.length
          )
        )

        linkNew.href = url
        linkNew.innerHTML = !link.innerHTML.includes("http")
          ? link.innerHTML
          : urlClamp(url)
        linkNew.target = "_blank"
        linkNew.rel = "noopener noreferrer"

        if (link.parentElement) link.parentElement.insertBefore(linkNew, link)
        link.remove()
      } catch (err) {
        console.error(err)
      }
    }
  })
}

export default removeLinkBalloon
