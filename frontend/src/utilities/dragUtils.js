const generateRandomHexId = (length = 24) => {
  let result = '';
  const characters = '0123456789abcdef'; // Hexadecimal characters
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

export const handleDragStart = (e, elementData) => {
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
  } catch (error) {
    return
  }

  const newElement = {
    ...newElementData,
    id: generateRandomHexId(),
    style: {},
  }

  const elementExists = postElements.some(element => 
    element.content === newElement.content && element.type === newElement.type
  )

  if (elementExists) {
    return
  }

  setPostElements([...postElements, newElement])
}

export const handleDragOver = (e) => {
  e.preventDefault()
}
