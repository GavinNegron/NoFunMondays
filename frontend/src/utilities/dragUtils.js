import $ from "jquery"

const generateRandomHexId = (length = 24) => {
  let result = '';
  const characters = '0123456789abcdef';
  
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

export const handleDrop = (e, postElements, setPostElements) => {
  $('.editor-sidebar__add-elements').stop(true, true).animate({}).fadeOut('fast');

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

  setPostElements([...postElements, newElement])
}

export const handleDragOver = (e) => {
  e.preventDefault()
}
