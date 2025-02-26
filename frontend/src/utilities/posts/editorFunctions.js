import elements from '@/data/elements'
import $ from 'jquery'

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
          
          const innerTag = element.firstElementChild;
          const updatedHTML = innerTag ? innerTag.innerHTML : element.innerHTML;
          
          dispatch(updatePostElement(element.id, updatedHTML));
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

export const handleMouseUp = (setIsDragging) => {
    setIsDragging(false);
}

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

export const handleElementClick = (element, setSelectedElement) => {
    $('.editor-sidebar__add-elements').stop(true, true).fadeOut('fast');

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

export const handleEditorOpen = () => {
  $(".editor-navbar__bottom").slideDown(75);
  $(".editor-open").hide();
  $(".editor-close").show();
  document.querySelector(".blog-post-content").style.top = '20px'
  document.querySelector(".editor-container").style.top = '165px'
};

export const handleEditorClose = () => {
  $(".editor-navbar__bottom").slideUp(75);
  $(".editor-open").show();
  $(".editor-close").hide();
  document.querySelector(".blog-post-content").style.top = '-10px'
  document.querySelector(".editor-container").style.top = '135px'
};