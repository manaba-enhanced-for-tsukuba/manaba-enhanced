"use strict"

declare namespace checkLang {
  type langCode = "ja" | "en"
}

const checkLangByDOMElement = (
  mylang: HTMLElement
): checkLang.langCode | undefined => {
  if (mylang.classList.contains("mylang-ja")) return "ja"
  if (mylang.classList.contains("mylang-en")) return "en"
  /* The fallback for the case where the service changes the class name */
  if (mylang.innerText.includes("日本語")) return "ja"
  if (mylang.innerText.includes("English")) return "en"
}

const checkLang = (): checkLang.langCode => {
  const checkLangElement = document.getElementById("mylang")
  return (checkLangElement && checkLangByDOMElement(checkLangElement)) ?? "ja"
}

export { checkLang }
