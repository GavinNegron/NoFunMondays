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

export const handleDrop = (e, dispatch, addPostElement) => {
  $('.editor-sidebar__add-elements').stop(true, true).animate({}).fadeOut('fast');
  
  const isValidJson = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  e.preventDefault();
  const data = e.dataTransfer.getData('text/plain');
  
  if (!isValidJson(data)) {
    console.error('Invalid JSON data:', data);
    return { newElement: null, insertIndex: -1 };
  }

  let newElementData;
  try {
    newElementData = JSON.parse(data);
  } catch (error) {
    console.error('Failed to parse data transfer:', error);
    return { newElement: null, insertIndex: -1 };
  }

  if (!newElementData || typeof newElementData !== 'object' || !newElementData.type || !newElementData.content) {
    console.error('Invalid element data:', newElementData);
    return { newElement: null, insertIndex: -1 };
  }

  const newElement = {
    ...newElementData,
    id: generateRandomHexId(),
    style: {},
  };

  // Calculate insert position based on mouse coordinates
  const container = e.currentTarget;
  const containerRect = container.getBoundingClientRect();
  const dropY = e.clientY - containerRect.top;
  
  // Get the inner container that holds the actual elements
  const innerContainer = container.querySelector('.blog-post-main__inner');
  if (!innerContainer) {
    console.error('Inner container not found');
    return { newElement: null, insertIndex: -1 };
  }
  
  const children = Array.from(innerContainer.children).filter(
    child => !child.classList.contains('drop-indicator')
  );
  
  // Default to end
  let insertIndex = children.length;
  
  // Find the insert position based on mouse position
  for (let i = 0; i < children.length; i++) {
    const rect = children[i].getBoundingClientRect();
    const elementMiddle = rect.top + (rect.height / 2) - containerRect.top;
    
    if (dropY < elementMiddle) {
      insertIndex = i - 1;
      break;
    }
  }

  // Remove existing drop indicators
  innerContainer.querySelectorAll('.drop-indicator').forEach(el => el.remove());

  // Insert the new element at the correct position
  dispatch(addPostElement(newElement, insertIndex));
};

export const handleDragOver = (e) => {
  e.preventDefault();
  
  const container = e.currentTarget;
  const containerRect = container.getBoundingClientRect();
  const mouseY = e.clientY - containerRect.top;
  
  // Get the inner container that holds the actual elements
  const innerContainer = container.querySelector('.blog-post-main__inner');
  if (!innerContainer) {
    console.error('Inner container not found');
    return;
  }
  
  // Remove existing drop indicators
  innerContainer.querySelectorAll('.drop-indicator').forEach(el => el.remove());
  
  // Create new indicator
  const indicator = document.createElement('div');
  indicator.className = 'drop-indicator';
  indicator.style.cssText = 'height: 2px; background: #007bff; margin: 4px 0; transition: all 0.2s ease;';
  
  // Get children excluding drop indicators
  const children = Array.from(innerContainer.children).filter(
    child => !child.classList.contains('drop-indicator')
  );
  
  let insertBeforeElement = null;
  
  for (let child of children) {
    const rect = child.getBoundingClientRect();
    const childMiddle = rect.top + (rect.height / 2) - containerRect.top;
    
    if (mouseY < childMiddle) {
      insertBeforeElement = child;
      break;
    }
  }
  
  if (insertBeforeElement) {
    innerContainer.insertBefore(indicator, insertBeforeElement);
  } else {
    innerContainer.appendChild(indicator);
  }
};