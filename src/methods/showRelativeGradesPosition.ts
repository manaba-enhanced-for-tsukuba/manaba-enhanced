const showRelativeGradesPosition = () =>
  document.querySelectorAll<HTMLElement>(".gradebar").forEach((gradebar) => {
    const barWidth = gradebar.getAttribute("width")
    const barSpanElement = gradebar.querySelector<HTMLElement>("span")
    const siblingBarWidth = gradebar.nextElementSibling?.getAttribute("width")
    if (!barWidth || !barSpanElement) return

    const floorRate = siblingBarWidth ? parseInt(siblingBarWidth) : 0
    const rate = parseInt(barWidth)

    barSpanElement.textContent = `${floorRate} - ${floorRate + rate}%`
  })

export { showRelativeGradesPosition }
