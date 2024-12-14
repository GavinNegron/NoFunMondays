// React
import { useState, useEffect, useRef, useCallback } from 'react';
import { BlockPicker } from 'react-color';

// Utils
import Tooltip from '../../../../utilities/tooltip';

// Data
import elements from '../../../../data/elements.json'

const EditStyles = ({ elementId, elementStyles, handleStyleChange, handleBlogPostElement, blogPostMainRef, selectedElement }) => {
  const [position, setPosition] = useState({ x: 0, y: 175, offsetX: 0, offsetY: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedColor, setSelectedColor] = useState(elementStyles?.color || '#000000');
  const [fontSize, setFontSize] = useState(18); // Default to 18px instead of null
  const [currentType, setCurrentType] = useState(elementStyles?.class || 'default-text');  
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef(null);
  const elementRef = useRef(null);

  useEffect(() => {
    if (elementRef.current) {
      const computedStyle = window.getComputedStyle(elementRef.current);
      const elementFontSize = computedStyle.fontSize;
      if (elementFontSize) setFontSize(parseInt(elementFontSize, 10));
    }
  }, [elementId]);

  useEffect(() => {
    if (elementStyles?.color !== selectedColor) setSelectedColor(elementStyles?.color || '#000000');
  }, [elementId, elementStyles?.color, selectedColor]);

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
    } }, 
    [isDragging, position.offsetX, position.offsetY]);

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

  const handleFamilyChange = (e) => handleStyleChange('fontFamily', e.target.value);
  const handleWeightChange = (e) => handleStyleChange('fontWeight', e.target.value);
  const handleColorChange = (color) => handleStyleChange('color', color.hex);

  const handleBoldChange = () => {
    const isBold = window.getComputedStyle(selectedElement).fontWeight;
    handleStyleChange('fontWeight', isBold === 'bold' || isBold === '700' ? 'normal' : 'bold');
  };

  const handleItalicChange = () => {
    const isItalic = window.getComputedStyle(selectedElement).fontStyle === 'italic';
    handleStyleChange('fontStyle', isItalic ? 'normal' : 'italic');
  };

  const handleUnderlineChange = () => {
    const textDecoration = window.getComputedStyle(selectedElement).textDecoration;
    handleStyleChange('textDecoration', textDecoration.includes('underline') ? 'none' : 'underline');
  };

  const handleSizeSliderChange = (e) => handleStyleChange('fontSize', `${e.target.value}px`);

  const handleSizeInputChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    if (!isNaN(newSize)) {
      setFontSize(newSize);
      handleStyleChange('fontSize', `${newSize}px`);
    }
  };

  const toggleColorPicker = () => setShowColorPicker(!showColorPicker);

  const handleAlignChange = (alignment) => {
    selectedElement.style.textAlign = alignment;
  };
  const handleTypeChange = (e) => {
    const selectedClass = e.target.value;
    setCurrentType(selectedClass);

    if (selectedElement) {
      selectedElement.classList.forEach((className) => {
        if (className.startsWith('h') || className === 'default-text') {
          selectedElement.classList.remove(className);
        }
      });
      selectedElement.classList.add(selectedClass);
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
            <BlockPicker color={selectedColor} onChange={handleColorChange} colors={elements.colorOptions} />
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
          <p>Type: </p>
          <select onChange={handleTypeChange}>
            {elements.text[0].classes.filter(item => !item.exclude).map((item, index) => (
              <option value={item.class} key={index}>{item.text}</option>
            ))}
          </select>
        </div>
        <div className="edit-styles__item">
          <p>Font Family: </p>
          <select value={elementStyles?.fontFamily || ''} onChange={handleFamilyChange}>
            {elements.fontOptions.map((font, index) => (
              <option key={index} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
        </div>
        <div className="edit-styles__item">
          <p>Font Weight: </p>
          <select onChange={handleWeightChange}>
            {elements.fontWeightOptions.map((weight, index) => (
              <option value={weight} key={index}>{weight}</option>
            ))}
          </select>
        </div>
        <div className="edit-styles__item">
          <p>Font Size: </p>
          <input type="range" min="8" max="72" value={fontSize} onChange={handleSizeSliderChange} />
          <input type="number" value={fontSize} min="8" max="72" onChange={handleSizeInputChange} />
        </div>
      </div>
    </div>
  );
};

export default EditStyles;
