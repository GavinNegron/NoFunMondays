
import elements from '../../../data/elements'

export const handleDelete = (event, selectedElement, setPostElements, setDeletedElements, setSelectedElement) => {
    setPostElements(prevPostElements =>
      prevPostElements.filter(element => element.id !== selectedElement.id)
    )
    setDeletedElements(prevDeleted => [...prevDeleted, selectedElement])
    setSelectedElement(null)
}

export const handleDoubleClick = (event, setSelectedElement, setPost, setPostElements) => {
  const element = event.currentTarget
  setSelectedElement(element)

  const textClasses = elements.text.classes.map(item => item.class)
  const listClasses = elements.lists.classes.map(item => item.class)

  const editableClasses = [...textClasses, ...listClasses]

  if (editableClasses.some(cls => element.classList.contains(cls))) {
    element.contentEditable = true
    element.style.outline = 'none'
    element.spellcheck = false
    element.focus()

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

export const handleMouseDown = (e, setIsDragging, setPosition) => {
  const element = e.target.closest('.edit-styles')
  if (!element) return

  const rect = element.getBoundingClientRect()
  const offsetX = e.clientX - rect.left
  const offsetY = e.clientY - rect.top
  setIsDragging(true)
  setPosition(prev => ({
    ...prev,
    offsetX,
    offsetY,
  }))
}

export const handleMouseMove = (isDragging, position, setPosition, elementRef) => {
  return (e) => {
    if (isDragging && elementRef.current) {
      const newX = e.clientX - position.offsetX
      const newY = e.clientY - position.offsetY
      const elementHeight = elementRef.current.offsetHeight
      const elementWidth = elementRef.current.offsetWidth
      const boundedX = Math.max(20, Math.min(window.innerWidth - elementWidth - 20, newX))
      const boundedY = Math.max(20, Math.min(window.innerHeight - elementHeight - 20, newY))
      setPosition(prev => ({ ...prev, x: boundedX, y: boundedY }))
    }
  }
}

export const handleMouseUp = (setIsDragging) => {
  setIsDragging(false)
}