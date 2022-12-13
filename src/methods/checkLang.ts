"use strict"

declare namespace checkLang {
  type langCode = "ja" | "en"
}

const getCheckLangElement = () => document.getElementById("mylang")

const checkLangByDOMElement = (
  mylang: HTMLElement
): checkLang.langCode | undefined => {
  if (mylang.classList.contains("mylang-ja")) return "ja"
  if (mylang.classList.contains("mylang-en")) return "en"
  if (mylang.innerText.includes("日本語")) return "ja"
  if (mylang.innerText.includes("English")) return "en"
}

const checkLang = (
  checkLangElement: HTMLElement | null = getCheckLangElement()
): checkLang.langCode =>
  (checkLangElement && checkLangByDOMElement(checkLangElement)) ?? "ja"

export { checkLang }
