import elements from '@/data/elements'
import $ from 'jquery'

/**
 * Handles double-clicking an element to make it editable.
 * @param {Event} event - The double-click event.
 * @param {function} dispatch - The dispatch function to update the post element.
 * @param {function} updatePostElement - The function to update the post element.
 */
export const handleDoubleClick = (event, dispatch, updatePostElement) => {
  const element = event.currentTarget;
  const textClasses = elements.text.classes.map(item => item.class);
  const listClasses = elements.lists.classes.map(item => item.class);
  const editableClasses = [...textClasses, ...listClasses];
  
  if (editableClasses.some(cls => element.classList.contains(cls))) {
    element.contentEditable = true;
    element.style.outline = "none";
    element.spellcheck = false;
    element.focus();
    
    let enterKeyReleased = true;
    
    const handleClickOutside = (e) => {
      if (!element.contains(e.target)) {
        dispatch(updatePostElement(element.id, element.innerHTML.trim())); 
        element.contentEditable = false;
        element.removeEventListener('keydown', handleKeyDown);
        element.removeEventListener('keyup', handleKeyUp);
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        
        if (!e.shiftKey) {
          element.contentEditable = false;
          element.removeEventListener('keydown', handleKeyDown);
          element.removeEventListener('keyup', handleKeyUp);
          document.removeEventListener('mousedown', handleClickOutside);
        } else if (e.shiftKey && enterKeyReleased) {
          enterKeyReleased = false;
          
          if (element.innerHTML.trim() === '') {
            element.innerHTML = '&nbsp;';
          }
          document.execCommand('insertText', false, '\n');
        }
      } else if (e.ctrlKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        const selection = window.getSelection().toString().trim();
        const urlPattern = /^(https?:\/\/[^\s]+)/;
        if (selection) {
          document.querySelector('#addLink-text').value = selection;
          if (urlPattern.test(selection)) {
            document.querySelector('#addLink-address').value = selection;
          } else {
            document.querySelector('#addLink-address').value = '';
          }
        } else {
          document.querySelector('#addLink-text').value = '';
          document.querySelector('#addLink-address').value = '';
        }
        document.querySelector('.addLink').style.display = 'flex';
      } 
      else if (e.ctrlKey) {
        const formatCommands = {
          'b': 'bold',
          'i': 'italic',
          'u': 'underline'
        };
        
        if (formatCommands[e.key.toLowerCase()]) {
          e.preventDefault();
          document.execCommand(formatCommands[e.key.toLowerCase()], false, null);
        }
      }
    };
    
    const handleKeyUp = (e) => {
      if (e.key === 'Enter') {
        enterKeyReleased = true;
      }
    };
    
    element.removeEventListener('keydown', handleKeyDown);
    element.removeEventListener('keyup', handleKeyUp);
    
    element.addEventListener('keydown', handleKeyDown);
    element.addEventListener('keyup', handleKeyUp);
  }
};

/**
 * Handles mouse down event for dragging an element.
 * @param {Event} e - The mouse down event.
 * @param {function} setIsDragging - The function to set dragging state.
 * @param {function} setPosition - The function to set the mouse position.
 */
export const handleMouseDown = (e, setIsDragging, setPosition) => {
    const element = e.target.closest('.edit-styles');
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setIsDragging(true);
    setPosition(prev => ({
        ...prev,
        offsetX,
        offsetY,
    }));
}

/**
 * Handles mouse move event for dragging an element.
 * @param {boolean} isDragging - The dragging state.
 * @param {object} position - The current mouse position.
 * @param {function} setPosition - The function to set the new mouse position.
 * @param {object} elementRef - The reference to the element being dragged.
 */
export const handleMouseMove = (isDragging, position, setPosition, elementRef) => {
    return (e) => {
        if (isDragging && elementRef.current) {
            const newX = e.clientX - position.offsetX;
            const newY = e.clientY - position.offsetY;
            const elementHeight = elementRef.current.offsetHeight;
            const elementWidth = elementRef.current.offsetWidth;
            const boundedX = Math.max(20, Math.min(window.innerWidth - elementWidth - 20, newX));
            const boundedY = Math.max(20, Math.min(window.innerHeight - elementHeight - 20, newY));
            setPosition(prev => ({ ...prev, x: boundedX, y: boundedY }));
        }
    }
}

/**
 * Handles mouse up event for stopping dragging an element.
 * @param {function} setIsDragging - The function to set dragging state.
 */
export const handleMouseUp = (setIsDragging) => {
    setIsDragging(false);
}

/**
 * Gets the computed styles of an element.
 * @param {HTMLElement} elementDom - The DOM element.
 * @return {object} - The computed styles.
 */
export const getElementStyles = (elementDom) => {
    const computedStyles = window.getComputedStyle(elementDom);
    return {
      color: computedStyles.color,
      margin: computedStyles.margin,
      fontFamily: computedStyles.fontFamily,
      fontSize: computedStyles.fontSize,
      fontWeight: computedStyles.fontWeight,
      fontStyle: computedStyles.fontStyle,
      textDecoration: computedStyles.textDecoration,
      textAlign: computedStyles.textAlign
    };
};

/**
 * Handles click event on an element to show/hide edit styles.
 * @param {HTMLElement} element - The clicked element.
 * @param {function} setSelectedElement - The function to set selected element.
 */
export const handleElementClick = (element, setSelectedElement) => {
    if (!element) {
        $('.edit-text-styles, .edit-image-styles, .edit-list-styles').stop(true, true).fadeOut('fast');
        return
    }

    if (setSelectedElement) setSelectedElement(element);

    const textClasses = elements.text.classes.map(item => item.class)
    const imageClasses = elements.image.classes.map(item => item.class)
    const listClasses = elements.lists.classes.map(item => item.class)
    const embedClasses = elements.embed.classes.map(item => item.class)

    if (textClasses.some(cls => element.classList.contains(cls))) {
        if ($('.edit-text-styles').is(':visible')) return
        $('.edit-image-styles').stop(true, true).fadeOut('fast')
        $('.edit-list-styles').stop(true, true).fadeOut('fast')
        $('.edit-embed-styles').stop(true, true).fadeOut('fast')
        $('.edit-text-styles').stop(true, true).fadeIn('fast')
        $('.edit-text-styles').css('display', 'flex').show()
    }

    if (imageClasses.some(cls => element.classList.contains(cls))) {
        if ($('.edit-image-styles').is(':visible')) return
        $('.edit-text-styles').stop(true, true).fadeOut('fast')
        $('.edit-list-styles').stop(true, true).fadeOut('fast')
        $('.edit-embed-styles').stop(true, true).fadeOut('fast')
        $('.edit-image-styles').stop(true, true).fadeIn('fast')
        $('.edit-image-styles').css('display', 'flex').show()
    }

    if (listClasses.some(cls => element.classList.contains(cls))) {
        if ($('.edit-list-styles').is(':visible')) return
        $('.edit-text-styles').stop(true, true).fadeOut('fast')
        $('.edit-image-styles').stop(true, true).fadeOut('fast')
        $('.edit-embed-styles').stop(true, true).fadeOut('fast')
        $('.edit-list-styles').stop(true, true).fadeIn('fast')
        $('.edit-list-styles').css('display', 'flex').show()
    }

    if (embedClasses.some(cls => element.classList.contains(cls))) {
        if ($('.edit-embed-styles').is(':visible')) return
        $('.edit-text-styles').stop(true, true).fadeOut('fast')
        $('.edit-image-styles').stop(true, true).fadeOut('fast')
        $('.edit-list-styles').stop(true, true).fadeOut('fast')
        $('.edit-embed-styles').stop(true, true).fadeIn('fast')
        $('.edit-embed-styles').css('display', 'flex').show()
    }
};

/**
 * Handles adding a link to an element.
 * @param {HTMLElement} selectedElement - The selected element to add link to.
 * @param {function} dispatch - The dispatch function to update the post element.
 * @param {function} updatePostElement - The function to update the post element.
 */
export const handleAddLink = (selectedElement, dispatch, updatePostElement) => {
    const textInput = document.querySelector('#addLink-text').value.trim();
    const linkInput = document.querySelector('#addLink-address').value.trim();

    if (!textInput || !linkInput || !selectedElement) return;

    const escapedId = CSS.escape(selectedElement.id);
    const element = document.querySelector(`#${escapedId}`);
    if (!element) return;

    const innerTag = element.firstElementChild;
    if (!innerTag) return;

    const innerHTML = innerTag.innerHTML;
    const regex = new RegExp(`(${textInput})`, 'g');
    const updatedHTML = innerHTML.replace(regex, `<a class='link' href="${linkInput}" target="_blank">${textInput}</a>`);

    innerTag.innerHTML = updatedHTML;
    document.querySelector('.addLink').style.display = 'none';

    dispatch(updatePostElement(selectedElement.id, updatedHTML));
};

/**
 * Handles opening the editor.
 */
export const handleEditorOpen = () => {
  $(".editor-navbar__bottom").slideDown(75);
  $(".editor-open").hide();
  $(".editor-close").show();
  document.querySelector(".blog-post-content").style.top = '20px'
  document.querySelector(".editor-container").style.top = '165px'
};

/**
 * Handles closing the editor.
 */
export const handleEditorClose = () => {
  $(".editor-navbar__bottom").slideUp(75);
  $(".editor-open").show();
  $(".editor-close").hide();
  document.querySelector(".blog-post-content").style.top = '-10px'
  document.querySelector(".editor-container").style.top = '135px'
};

/**
 * Handles clicking outside a specific DOM element and fades it out.
 * @param {Event} event - The click event.
 * @param {HTMLElement} targetClasses - The target elements.
 * @param {HTMLElement} targetRemove - The element to remove.
 */
export const handleClickOutside = (event, targetClasses, targetRemove) => {
  const targetArray = Array.isArray(targetClasses) ? targetClasses : [targetClasses];
  const isClickInsideTarget = targetArray.some(targetClass => event.target.closest(targetClass));
  if (!isClickInsideTarget && targetRemove) {
    $(targetRemove).stop(true, true).fadeOut(200); 
    $("body").css("max-height", "none");
    $("body").css("overflow", "visible");
  }
};

/**
 * Adds a class to a specific DOM element.
 * @param {string} selector - The CSS selector for the target element.
 * @param {string} className - The class to add.
 */
export const addClassToElement = (selector, className) => {
  const element = document.querySelector(selector)
  if (element) {
    element.classList.add(className)
  }
}

/**
 * Removes a class from a specific DOM element.
 * @param {string} selector - The CSS selector for the target element.
 * @param {string} className - The class to remove.
 */
export const removeClassFromElement = (selector, className) => {
  const element = document.querySelector(selector)
  if (element) {
    element.classList.remove(className)
  }
}

const generateRandomHexId = (length = 24) => {
  let result = '';
  const characters = '0123456789abcdef';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * Handles drag start event for dragging an element.
 * @param {Event} e - The drag start event.
 * @param {object} elementData - The data of the element being dragged.
 */
export const handleDragStart = (e, elementData) => {
  const data = {
    type: elementData.class,
    content: elementData.text,
  };
  e.dataTransfer.setData('text/plain', JSON.stringify(data));
};

/**
 * Handles drop event for dropping an element.
 * @param {Event} e - The drop event.
 * @param {function} dispatch - The dispatch function to add the post element.
 * @param {function} addPostElement - The function to add the post element.
 */
export const handleDrop = (e, dispatch, addPostElement) => {
  $('.editor-sidebar__elements').stop(true, true).animate({}).fadeOut('fast');
  
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

  innerContainer.querySelectorAll('.drop-indicator').forEach(el => el.remove());

  dispatch(addPostElement(newElement, insertIndex));
};

/**
 * Handles drag over event for dragging an element over the drop zone.
 * @param {Event} e - The drag over event.
 */
export const handleDragOver = (e) => {
  e.preventDefault();
  
  const container = e.currentTarget;
  const containerRect = container.getBoundingClientRect();
  const mouseY = e.clientY - containerRect.top;
  
  const innerContainer = container.querySelector('.blog-post-main__inner');
  if (!innerContainer) {
    console.error('Inner container not found');
    return;
  }
  
  innerContainer.querySelectorAll('.drop-indicator').forEach(el => el.remove());
  
  const indicator = document.createElement('div');
  indicator.className = 'drop-indicator';
  indicator.style.cssText = 'height: 2px; background: #007bff; margin: 4px 0; transition: all 0.2s ease;';
  
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