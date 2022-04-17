export const setUsermemoShortcuts = () => {
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      const submitButton = document.querySelector<HTMLElement>(
        'input[name="action_Usermemo_update"]'
      )
      if (submitButton) submitButton.click()
    }
  })
}
