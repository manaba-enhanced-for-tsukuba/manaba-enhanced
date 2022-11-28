const showRelativeGradesPosition = () =>
  document.querySelectorAll<HTMLElement>(".gradebar").forEach((gradebar) => {
    const barWidth = gradebar.getAttribute("width")
    const barSpanElement = gradebar.querySelector<HTMLElement>("span")
    if (!barWidth || !barSpanElement) return

    const rate = parseInt(barWidth)

    if (gradebar.nextElementSibling === null) {
      barSpanElement.textContent = `0 - ${rate}%`
    } else {
      const siblingBarWidth = gradebar.nextElementSibling.getAttribute("width")
      if (!siblingBarWidth) return

      const higherRate = parseInt(siblingBarWidth)
      barSpanElement.textContent = `${higherRate} - ${rate + higherRate}%`
    }
  })

export { showRelativeGradesPosition }
