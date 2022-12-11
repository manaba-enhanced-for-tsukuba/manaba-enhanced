"use strict"

export declare namespace checkLang {
  type langCode = "ja" | "en"
}

export const checkLang = (): checkLang.langCode => {
  const mylang = document.getElementById("mylang")
  if (!mylang) return "ja"

  return checkLangByDOMElement(mylang) ?? "ja"
}

const checkLangByDOMElement = (
  mylang: HTMLElement
): checkLang.langCode | undefined => {
  switch (mylang.className) {
    case "mylang-ja":
      return "ja"
    case "mylang-en":
      return "en"
  }

  switch (mylang.innerText) {
    case "日本語":
      return "ja"
    case "English":
      return "en"
  }
}
