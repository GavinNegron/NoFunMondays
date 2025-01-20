import $ from "jquery";

const generateRandomHexId = (length = 24) => {
  let result = '';
  const characters = '0123456789abcdef';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

export const handleDragStart = (e, elementData) => {
  const data = {
    type: elementData.class,
    content: elementData.text,
  };
  e.dataTransfer.setData('text/plain', JSON.stringify(data));
};

export const handleDrop = (e) => {
  $('.editor-sidebar__add-elements').stop(true, true).animate({}).fadeOut('fast');

  const isValidJson = (str) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  e.preventDefault();

  const data = e.dataTransfer.getData('text/plain');
  if (!isValidJson(data)) {
    console.error('Invalid JSON data:', data);
    return null;
  }

  let newElementData;
  try {
    newElementData = JSON.parse(data);
  } catch (error) {
    console.error('Failed to parse data transfer:', error);
    return null;
  }

  if (!newElementData || typeof newElementData !== 'object' || !newElementData.type || !newElementData.content) {
    console.error('Invalid element data:', newElementData);
    return null;
  }

  const newElement = {
    ...newElementData,
    id: generateRandomHexId(),
    style: {},
  };

  return newElement;
};

export const handleDragOver = (e) => {
  e.preventDefault();
};