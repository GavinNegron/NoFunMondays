import axios from 'axios';

export const getElementStyles = (elementDom) => {
  if (!elementDom) return {};  // Ensure elementDom is not null or undefined

  const computedStyles = window.getComputedStyle(elementDom)
  return {
    color: computedStyles.color,
    margin: computedStyles.margin,
    fontFamily: computedStyles.fontFamily,
    fontSize: computedStyles.fontSize,
    fontWeight: computedStyles.fontWeight,
    fontStyle: computedStyles.fontStyle,
    textDecoration: computedStyles.textDecoration,
    textAlign: computedStyles.textAlign,
  }
}

export const generateCustomCss = (stylesMap) => {
  let customCss = ''
  stylesMap.forEach((style, id) => {
    const cssClass = `#${id}`
    customCss += `
      ${cssClass} {
        color: ${style.color};
        margin: ${style.margin};
        font-family: ${style.fontFamily};
        font-size: ${style.fontSize};
        font-weight: ${style.fontWeight};
        font-style: ${style.fontStyle};
        text-decoration: ${style.textDecoration};
        text-align: ${style.textAlign};
      }
    `
  })
  return customCss
}


export const handleFamilyChange = (e, setStyle, handleStyleChange) => {
  const newFontFamily = e.target.value;
  setStyle(prevStyle => ({ ...prevStyle, fontFamily: newFontFamily }));
  handleStyleChange('fontFamily', newFontFamily);
};

export const handleWeightChange = (e, setStyle, handleStyleChange) => {
  const newFontWeight = e.target.value;
  setStyle(prevStyle => ({ ...prevStyle, fontWeight: newFontWeight }));
  handleStyleChange('fontWeight', newFontWeight);
};

export const handleColorChange = (color, setStyle, handleStyleChange) => {
  setStyle(prevStyle => ({ ...prevStyle, color: color.hex }));
  handleStyleChange('color', color.hex);
};

export const handleBoldChange = (selectedElement, setStyle, handleStyleChange) => {
  const isBold = window.getComputedStyle(selectedElement).fontWeight;
  const newFontWeight = isBold === 'bold' || isBold === '700' ? 'normal' : 'bold';
  setStyle(prevStyle => ({ ...prevStyle, fontWeight: newFontWeight }));
  handleStyleChange('fontWeight', newFontWeight);
};

export const handleItalicChange = (selectedElement, handleStyleChange) => {
  const isItalic = window.getComputedStyle(selectedElement).fontStyle === 'italic';
  const newFontStyle = isItalic ? 'normal' : 'italic';
  handleStyleChange('fontStyle', newFontStyle);
};

export const handleUnderlineChange = (selectedElement, handleStyleChange) => {
  const textDecoration = window.getComputedStyle(selectedElement).textDecoration;
  const newTextDecoration = textDecoration.includes('underline') ? 'none' : 'underline';
  handleStyleChange('textDecoration', newTextDecoration);
};

export const handleSizeInputChange = (e, setStyle, handleStyleChange) => {
  const newSize = parseInt(e.target.value, 10);
  if (!isNaN(newSize)) {
    setStyle(prevStyle => ({ ...prevStyle, fontSize: newSize }));
    handleStyleChange('fontSize', `${newSize}px`);
  }
};

export const handleAlignChange = (alignment, selectedElement) => {
  selectedElement.style.textAlign = alignment;
};

export const handleTypeChange = (e, setStyle, handleStyleChange, selectedElement) => {
  const selectedClass = e.target.value;
  setStyle(prevStyle => ({ ...prevStyle, currentType: selectedClass }));
  if (selectedElement) {
    selectedElement.classList.forEach((className) => {
      if (className.startsWith('h') || className === 'default-text') {
        selectedElement.classList.remove(className);
      }
    });
    selectedElement.classList.add(selectedClass);
    handleStyleChange('class', selectedClass);
  }
};

export const handleMarginChange = (e, direction, handleStyleChange, setStyle, style, selectedElement) => {
  const value = parseInt(e.target.value, 10) || 0
  const updatedStyleKey = `margin${direction.charAt(0).toUpperCase() + direction.slice(1)}`

  setStyle(prevStyle => {
    const updatedStyle = { ...prevStyle, [updatedStyleKey]: value }
    handleStyleChange(updatedStyleKey, value)
    return updatedStyle
  })

  if (selectedElement) {
    selectedElement.style[updatedStyleKey] = `${value}px`
  }
}

export const handleImageChange = async (newImageUrl, setImageUrl) => {
  
};