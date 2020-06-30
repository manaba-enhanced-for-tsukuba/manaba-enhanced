"use strict"

const checkLang = () => {
  const mylang = document.getElementById("mylang")
  if (mylang.className.indexOf("ja") !== -1) {
    return "ja"
  } else if (mylang.className.indexOf("en") !== -1) {
    return "en"
  }
}

export default checkLang
