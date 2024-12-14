export const handleDragStart = (e, elementData) => {
  console.log('Drag started with data:', elementData)
  const data = {
    type: elementData,
    content: elementData, 
  }
  e.dataTransfer.setData('text/plain', JSON.stringify(data))
}

export const handleDrop = (e, targetElementId, postElements, setPostElements) => {
  e.preventDefault()

  let newElementData
  try {
    newElementData = JSON.parse(e.dataTransfer.getData('text/plain'))
    console.log('Dropped data:', newElementData)
  } catch (error) {
    console.error('Invalid drag data:', error)
    return
  }

  const newElement = {
    ...newElementData,
    id: `${newElementData.type}-${Date.now()}`,
    style: {},
  }

  console.log('New element to be added:', newElement)

  const elementExists = postElements.some(element => 
    element.content === newElement.content && element.type === newElement.type
  )

  if (elementExists) {
    console.log('Element already exists, not adding.')
    return
  }

  setPostElements([...postElements, newElement])
}

export const handleDragOver = (e) => {
  e.preventDefault()
}
