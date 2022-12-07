"use strict"

const trimCode = (str: string) =>
  str
    .replace(/[０-９]/g, (s) => String.fromCharCode(s.charCodeAt(0) - 0xfee0))
    .replace(/[^0-9]/g, "")

const validateCode = (code: string) => new RegExp("(\\d{9})", "g").test(code)

/**
 * Open Respon code in the new tab
 * @param {string} code Respon code like "123 456 789"
 */
const openCodeInRespon = (code: string): void => {
  const trimmedCode = trimCode(code)
  if (validateCode(trimmedCode)) {
    window.open(
      `https://atmnb.tsukuba.ac.jp/attend/tsukuba?code=${trimmedCode}`
    )
  }
}

export default openCodeInRespon
