declare const manaba: {
  submit_with_button: (form: any, buttonName: string) => void
}

const injectScript = (func: any) => {
  const scriptElement = document.createElement("script")
  scriptElement.appendChild(document.createTextNode(`;(${func})();`))
  ;(document.body || document.head || document.documentElement).appendChild(
    scriptElement
  )
}

const main = (): void => {
  const fileInput = document.querySelector(".form-input-file") as
    | HTMLInputElement
    | undefined
  const formWrapper = document.querySelector(".form") as
    | HTMLDivElement
    | undefined

  const addMessage = (formItemsWrapper: Element): void => {
    const messageElement = document.createElement("p")
    messageElement.innerText =
      "ドラッグアンドドロップでファイルを追加することができます"
    formItemsWrapper.insertBefore(
      messageElement,
      formItemsWrapper.childNodes[0]
    )
  }

  if (fileInput && formWrapper) {
    const formItemsWrapper = document.querySelector(".report-form")
    formItemsWrapper && addMessage(formItemsWrapper)

    formWrapper.addEventListener(
      "dragenter",
      (e) => {
        e.preventDefault()

        formWrapper.style.backgroundColor = "#e1f5fe"
      },
      false
    )

    formWrapper.addEventListener("dragover", (e) => {
      e.preventDefault()
    })

    formWrapper.addEventListener(
      "dragleave",
      (e) => {
        const { top, bottom, left, right } = formWrapper.getBoundingClientRect()
        if (
          e.clientY < top ||
          e.clientY >= bottom ||
          e.clientX < left ||
          e.clientX >= right
        ) {
          e.preventDefault()
          formWrapper.style.backgroundColor = ""
        }
      },
      false
    )

    formWrapper.addEventListener(
      "drop",
      (e) => {
        e.preventDefault()

        if (e.dataTransfer?.files.length) {
          formWrapper.style.backgroundColor = ""

          fileInput.files = e.dataTransfer.files

          if (manaba.submit_with_button) {
            manaba.submit_with_button(
              document.querySelector("form"),
              "action_ReportStudent_submitdone"
            )
          }
        } else {
          formWrapper.style.backgroundColor = "#ffebee"
        }
      },
      false
    )
  }
}

const dragAndDrop = (): void => {
  injectScript(main)
}

export { dragAndDrop }
