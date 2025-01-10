export const handleDoubleClick = (event) => {
  const element = event.currentTarget

    element.contentEditable = true
    element.style.outline = 'none'
    element.style.cursor = 'text'; 
    element.spellcheck = false;
    element.focus();

    const selection = window.getSelection()
    const range = document.createRange()
    selection.removeAllRanges()

    const rect = element.getBoundingClientRect()
    const offsetX = event.clientX - rect.left
    const textNode = element.firstChild

    if (textNode) {
      let charIndex = 0
      const span = document.createElement('span')
      span.style.visibility = 'hidden'
      span.style.whiteSpace = 'pre'
      document.body.appendChild(span)

      for (let i = 0; i < textNode.length; i++) {
        span.textContent = textNode.nodeValue.slice(0, i + 1)
        const charRect = span.getBoundingClientRect()

        if (offsetX >= charRect.left && offsetX <= charRect.right) {
          charIndex = i
          break
        }
      }

      document.body.removeChild(span)
      range.setStart(textNode, charIndex)
      range.setEnd(textNode, charIndex)
      selection.addRange(range)
    }

    element.addEventListener('blur', () => {
      element.contentEditable = false
    })

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        e.stopPropagation()
      }
      if (e.key === 'Enter') {
        element.contentEditable = false
      }
    })
}