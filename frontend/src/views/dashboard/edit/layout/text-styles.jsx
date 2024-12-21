import { useState, useEffect, useRef, useCallback } from 'react';
import { BlockPicker } from 'react-color';

import Tooltip from '../../../../utilities/tooltip';
import elements from '../../../../data/elements.json';

const EditStyles = ({ elementId, elementStyles, handleStyleChange, handleBlogPostElement, blogPostMainRef, selectedElement }) => {
  const [position, setPosition] = useState({ x: 0, y: 175, offsetX: 0, offsetY: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [style, setStyle] = useState({
    color: elementStyles?.color || '#000000',
    fontSize: elementStyles?.fontSize || 18,
    fontFamily: elementStyles?.fontFamily || '',
    fontWeight: elementStyles?.fontWeight || 'normal',
    currentType: elementStyles?.class || 'default-text',
  });
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef(null);
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      const computedStyle = window.getComputedStyle(elementRef.current);
      setStyle(prevStyle => ({
        ...prevStyle,
        fontSize: parseInt(computedStyle.fontSize, 10) || 18,
      }));
    }
  }, [elementId]);

  useEffect(() => {
    if (elementStyles?.color !== style.color) setStyle(prevStyle => ({ ...prevStyle, color: elementStyles?.color || '#000000' }));
  }, [elementId, elementStyles?.color, style.color]);

  useEffect(() => {
    const updatePosition = () => {
      if (blogPostMainRef.current) {
        const rect = blogPostMainRef.current.getBoundingClientRect();
        const xPos = rect.left;
        setPosition(prev => ({ ...prev, x: xPos - 275 }));
      }
    };

    const onWindowLoad = () => {
      setTimeout(updatePosition, 100);  
    };

    if (window.document.readyState === 'complete') onWindowLoad();
    else window.addEventListener('load', onWindowLoad);

    return () => window.removeEventListener('load', onWindowLoad);
  }, [blogPostMainRef]);

  useEffect(() => {
    if (selectedElement) {
      const computedStyle = window.getComputedStyle(selectedElement);
  
      setStyle(prevStyle => ({
        ...prevStyle,
        color: computedStyle.color || '#000000',
        fontSize: parseInt(computedStyle.fontSize, 10) || 18,
        fontFamily: computedStyle.fontFamily || '',
        fontWeight: computedStyle.fontWeight || 'normal',
      }));

      const elementType = Array.from(selectedElement.classList).find(className =>
        ['default-text', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(className)
      ) || 'default-text';
      setStyle(prevStyle => ({ ...prevStyle, currentType: elementType }));
    }
  }, [selectedElement, elementId]);

  const handleMouseDown = (e) => {
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
  };

  const handleMouseMove = useCallback((e) => { 
    if (isDragging && elementRef.current) { 
      const newX = e.clientX - position.offsetX; 
      const newY = e.clientY - position.offsetY; 
      const elementHeight = elementRef.current.offsetHeight; 
      const elementWidth = elementRef.current.offsetWidth; 
      const boundedX = Math.max(20, Math.min(window.innerWidth - elementWidth - 20, newX)); 
      const boundedY = Math.max(20, Math.min(window.innerHeight - elementHeight - 20, newY)); 
      setPosition(prev => ({ ...prev, x: boundedX, y: boundedY, })); 
    } 
  }, [isDragging, position.offsetX, position.offsetY]);

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove]);

  const handleClickOutside = (e, ref, callback) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback(false);
    }
  };

  useEffect(() => {
    const handleColorPickerOutsideClick = (e) => handleClickOutside(e, colorPickerRef, setShowColorPicker);
    
    document.addEventListener('mousedown', handleColorPickerOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleColorPickerOutsideClick);
    };
  }, []);

  const handleFamilyChange = (e) => {
    const newFontFamily = e.target.value;
    setStyle(prevStyle => ({ ...prevStyle, fontFamily: newFontFamily }));
    handleStyleChange('fontFamily', newFontFamily);
  };

  const handleWeightChange = (e) => {
    const newFontWeight = e.target.value;
    setStyle(prevStyle => ({ ...prevStyle, fontWeight: newFontWeight }));
    handleStyleChange('fontWeight', newFontWeight);
  };

  const handleColorChange = (color) => {
    setStyle(prevStyle => ({ ...prevStyle, color: color.hex }));
    handleStyleChange('color', color.hex);
  };

  const handleBoldChange = () => {
    const isBold = window.getComputedStyle(selectedElement).fontWeight;
    const newFontWeight = isBold === 'bold' || isBold === '700' ? 'normal' : 'bold';
    setStyle(prevStyle => ({ ...prevStyle, fontWeight: newFontWeight }));
    handleStyleChange('fontWeight', newFontWeight);
  };

  const handleItalicChange = () => {
    const isItalic = window.getComputedStyle(selectedElement).fontStyle === 'italic';
    const newFontStyle = isItalic ? 'normal' : 'italic';
    handleStyleChange('fontStyle', newFontStyle);
  };

  const handleUnderlineChange = () => {
    const textDecoration = window.getComputedStyle(selectedElement).textDecoration;
    const newTextDecoration = textDecoration.includes('underline') ? 'none' : 'underline';
    handleStyleChange('textDecoration', newTextDecoration);
  };

  const handleSizeInputChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    if (!isNaN(newSize)) {
      setStyle(prevStyle => ({ ...prevStyle, fontSize: newSize }));
      handleStyleChange('fontSize', `${newSize}px`);
    }
  };

  const toggleColorPicker = () => setShowColorPicker(!showColorPicker);

  const handleAlignChange = (alignment) => {
    selectedElement.style.textAlign = alignment;
  };

  const handleTypeChange = (e) => {
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
  

  return (
    <div className="edit-styles edit-text-styles" style={{ position: 'absolute', top: `${position.y}px`, left: `${position.x}px` }}>
      <div className="edit-styles__header" style={{ cursor: isDragging ? 'grabbing' : 'move' }} onMouseDown={handleMouseDown} ref={elementRef}>
        <p>Edit Text:</p>
        <i onClick={() => handleBlogPostElement(null)} className="fa-solid fa-light fa-xmark"></i>
      </div>
      <div className="edit-styles__item edit-styles__item__icons">
        <i onClick={handleBoldChange} data-tooltip-id="tip-bold" className="fa-solid fa-bold"></i>
        <i onClick={handleItalicChange} data-tooltip-id="tip-italic" className="fa-solid fa-italic"></i>
        <i onClick={handleUnderlineChange} data-tooltip-id="tip-underline" className="fa-solid fa-underline"></i>
        <i data-tooltip-id="tip-color" onClick={toggleColorPicker} className="fa-solid fa-palette"></i>
        <Tooltip id="tip-bold" header="Bold" place="top" background="#242529" fontWeight="600" />
        <Tooltip id="tip-italic" header="Italic" place="top" background="#242529" fontWeight="600" />
        <Tooltip id="tip-underline" header="Underline" place="top" background="#242529" fontWeight="600" />
        <Tooltip id="tip-color" header="Color" place="top" background="#242529" fontWeight="600" />
        {showColorPicker && (
          <div className="color-picker-container" ref={colorPickerRef} style={{ position: 'absolute', zIndex: 2, top: '115px', left: '103px' }}>
            <BlockPicker color={style.color} onChange={handleColorChange} colors={elements.colorOptions} />
          </div>
        )}
      </div>
      <div className="edit-styles__item edit-styles__item__icons">
        <i onClick={() => handleAlignChange('left')} data-tooltip-id="tip-left" className="fa-solid fa-align-left"></i>
        <i onClick={() => handleAlignChange('center')} data-tooltip-id="tip-center" className="fa-solid fa-align-center"></i>
        <i onClick={() => handleAlignChange('right')} data-tooltip-id="tip-right" className="fa-solid fa-align-right"></i>
        <Tooltip id="tip-left" header="Align Left" place="top" background="#242529" fontWeight="600" />
        <Tooltip id="tip-center" header="Align Center" place="top" background="#242529" fontWeight="600" />
        <Tooltip id="tip-right" header="Align Right" place="top" background="#242529" fontWeight="600" />
      </div>
      <div className="edit-styles__container">
        <div className="edit-styles__item">
          <p>Font Family: </p>
          <select value={style.fontFamily} onChange={handleFamilyChange}>
            {elements.fontOptions.map((font, index) => (
              <option key={index} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
        </div>
        <div className="edit-styles__item">
          <p>Type: </p>
          <select value={style.currentType} onChange={handleTypeChange}>
            {elements.text[0].classes.filter(item => !item.exclude).map((item, index) => (
              <option value={item.class} key={index}>{item.text}</option>
            ))}
          </select>
        </div>
        <div className="edit-styles__item">
          <p>Font Weight: </p>
          <select value={style.fontWeight} onChange={handleWeightChange}>
            {elements.fontWeightOptions.map((weight, index) => (
              <option value={weight} key={index}>{weight}</option>
            ))}
          </select>
        </div>
        <div className="edit-styles__item">
          <p>Font Size: </p>
          <select value={style.fontSize} onChange={handleSizeInputChange}>
            {elements.fontSizeOptions.map((size, index) => (
              <option value={size} key={index}>{size}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default EditStyles;
