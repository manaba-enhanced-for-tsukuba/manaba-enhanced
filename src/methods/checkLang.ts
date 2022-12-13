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
  if (mylang.classList.contains("mylang-ja")) return "ja"
  if (mylang.classList.contains("mylang-en")) return "en"
  if (mylang.innerText.includes("日本語")) return "ja"
  if (mylang.innerText.includes("English")) return "en"
}
