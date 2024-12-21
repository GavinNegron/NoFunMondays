import elements from '../../data/elements'

export const handleKeyDown = (event, selectedElement, setPostElements, setDeletedElements, setSelectedElement) => {
  if ((event.key === 'Delete' || event.key === 'Backspace') && selectedElement && !event.target.isContentEditable) {
    setPostElements(prevPostElements =>
      prevPostElements.filter(element => element.id !== selectedElement.id)
    )
    setDeletedElements(prevDeleted => [...prevDeleted, selectedElement])
    setSelectedElement(null)
  }
}

export const handleDoubleClick = (event, selectedElement, setPostElements, setDeletedElements, setSelectedElement, setPost) => {
  console.log('Double-click triggered', event)

  const element = event.currentTarget
  setSelectedElement(element)

  const textClasses = elements.text[0]?.classes.map(item => item.class) || []
  const imageClasses = elements.image[0]?.classes || []

  if (textClasses.some(cls => element.classList.contains(cls))) {
    element.contentEditable = true
    element.style.outline = 'none'
    element.spellcheck = false
    element.focus()

    const selection = window.getSelection()
    const range = document.createRange()
    selection.removeAllRanges()

    const rect = element.getBoundingClientRect()
    const offsetX = event.clientX - rect.left
    const offsetY = event.clientY - rect.top
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
      setPostElements(prevPostElements =>
        prevPostElements.map(el => el.id === element.id ? { ...el, content: element.innerText } : el)
      )
      if (element.classList.contains('blog-post-main__title')) {
        setPost(prevPost => ({ ...prevPost, title: element.innerText }))
      }
    })

    element.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        e.stopPropagation()
      }
      if (e.key === 'Enter') {
        element.contentEditable = false
        setPostElements(prevPostElements =>
          prevPostElements.map(el => el.id === element.id ? { ...el, content: element.innerText } : el)
        )
        if (element.classList.contains('blog-post-main__title')) {
          setPost(prevPost => ({ ...prevPost, title: element.innerText }))
        }
      }
    })
  }
}