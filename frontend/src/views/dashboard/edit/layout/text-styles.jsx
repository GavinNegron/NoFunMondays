import { useState, useEffect, useRef, useCallback } from 'react';
import { BlockPicker  } from 'react-color';
import Tooltip from '../../../../utilities/tooltip';


const EditStyles = ({ elementId, elementStyles, handleStyleChange, handleBlogPostElement, blogPostMainRef, selectedElement }) => {
  const [position, setPosition] = useState({ x: 0, y: 175, offsetX: 0, offsetY: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedColor, setSelectedColor] = useState(elementStyles?.color || '#000000');
  const [fontSize, setFontSize] = useState(null); 
  const [showColorPicker, setShowColorPicker] = useState(false);
  const colorPickerRef = useRef(null);
  const elementRef = useRef(null);

  const fontOptions = [
    "Poppins", "Roboto", "Open Sans", "Lora", "Montserrat", "Arial", "Verdana", "Times New Roman", 
    "Georgia", "Courier New", "Tahoma", "Trebuchet MS", "Impact", "Comic Sans MS", 
    "Lucida Sans", "Calibri", "Palatino", "Garamond", "Century Gothic", "Futura", 
    "Helvetica", "Arial Black", "Arial Narrow", "Brush Script MT", "Sans-serif"
  ];

  useEffect(() => {
    if (elementRef.current) {
      const computedStyle = window.getComputedStyle(elementRef.current);
      const elementFontSize = computedStyle.fontSize;
      if (elementFontSize) {
        setFontSize(parseInt(elementFontSize, 10));
      }
    }
  }, [elementId]);

  useEffect(() => {
    if (elementStyles?.color !== selectedColor) {
      setSelectedColor(elementStyles?.color || '#000000');
    }
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
      setTimeout(() => {
        updatePosition();
      }, 100);  
    };

    if (window.document.readyState === 'complete') {
      onWindowLoad();  
    } else {
      window.addEventListener('load', onWindowLoad);
    }

    return () => {
      window.removeEventListener('load', onWindowLoad);  
    };
  }, [blogPostMainRef]); 

  const handleHeaderMouseDown = (e) => {
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
    if (isDragging) {
      const newX = e.clientX - position.offsetX;
      const newY = e.clientY - position.offsetY;
  
      const elementHeight = elementRef.current.offsetHeight;
      const elementWidth = elementRef.current.offsetWidth;
  
      const boundedX = Math.max(20, Math.min(window.innerWidth - elementWidth - 20, newX));
  
      const availableHeight = window.innerHeight - elementHeight - 20;
  
      const boundedY = Math.max(20, Math.min(availableHeight, newY));
  
      setPosition(prev => ({
        ...prev,
        x: boundedX,
        y: boundedY,
      }));
    }
  }, [isDragging, position.offsetX, position.offsetY]);
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };

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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) {
        setShowColorPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleFontFamilyChange = (e) => {
    handleStyleChange('fontFamily', e.target.value);
  };

  const handleFontWeightChange = (e) => {
    handleStyleChange('fontWeight', e.target.value);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
    handleStyleChange('color', color.hex);
  };
  
  const handleBoldChange = () => {
    const isBold = window.getComputedStyle(selectedElement).fontWeight;
    if (isBold === 'bold' || isBold === '700') {
      handleStyleChange('fontWeight', 'normal');
    } else {
      handleStyleChange('fontWeight', 'bold');
    }
  };

  const handleItalicChange = () => {
    const isItalic = window.getComputedStyle(selectedElement).fontStyle === 'italic';
    
    if (isItalic === true) {
      handleStyleChange('fontStyle', 'normal');
    } else {
      handleStyleChange('fontStyle', 'italic');
    }
  };

  const handleUnderlineChange = () => {
    const textDecoration = window.getComputedStyle(selectedElement).textDecoration;
    const isUnderline = textDecoration.includes('underline');
    
    if (isUnderline) {
      handleStyleChange('textDecoration', 'none');
    } else {
      handleStyleChange('textDecoration', 'underline');
    }
  };
  

  const handleFontSizeSliderChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setFontSize(newSize);
    handleStyleChange('fontSize', `${newSize}px`);
  };

  const handleFontSizeInputChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    if (!isNaN(newSize)) {
      setFontSize(newSize);
      handleStyleChange('fontSize', `${newSize}px`);
    }
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleAlignChange = (alignment) => {
    if (alignment === 'left') {
      selectedElement.style.textAlign = 'left';
    } else if (alignment === 'center') {
      selectedElement.style.textAlign = 'center';
    } else if (alignment === 'right') {
      selectedElement.style.textAlign = 'right';
    }
  };

  return (
    <div
      className="edit-styles edit-text-styles"
      style={{
        position: 'absolute',
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <div
        className="edit-styles__header"
        style={{ cursor: isDragging ? 'grabbing' : 'move' }}
        onMouseDown={handleHeaderMouseDown}
      >
        <p>Edit Text:</p>
        <i onClick={() => handleBlogPostElement(null)} className="fa-solid fa-light fa-xmark"></i>
      </div>
      <div className="edit-styles__item edit-styles__item__icons">
          <i onClick={handleBoldChange} data-tooltip-id='tip-bold' className="fa-solid fa-bold"></i>
          <i onClick={handleItalicChange} data-tooltip-id='tip-italic' className="fa-solid fa-italic"></i>
          <i onClick={handleUnderlineChange} data-tooltip-id='tip-underline' className="fa-solid fa-underline"></i>
          <i data-tooltip-id='tip-color' onClick={toggleColorPicker} className="fa-solid fa-palette"></i> 


          <Tooltip 
            id="tip-bold" 
            header="Bold" 
            place="top"
            background='#242529'
            fontWeight='600'
          />
              
          <Tooltip 
            id="tip-italic" 
            header="Italic" 
            place="top"
            background='#242529'
            fontWeight='600'
          />
          <Tooltip 
            id="tip-underline" 
            header="Underline" 
            place="top"
            background='#242529'
            fontWeight='600'
          />
          <Tooltip 
            id="tip-color" 
            header="Color" 
            place="top"
            background='#242529'
            fontWeight='600'
          />

    {showColorPicker && (
      <div
        className="color-picker-container"
        ref={colorPickerRef}
        style={{
          position: 'absolute',
          zIndex: 2,
          top: '115px',
          left: '103px'
        }}
      >
        <BlockPicker
          color={selectedColor}
          onChange={handleColorChange}
          colors={['black', 'white', 'green', '#FF33A6', '#FFDB33', '#33FFF5', '#8D33FF', '#FF8D33', '#333FFF']}
        />
        
      </div>
    )}
        </div>

        <div className="edit-styles__item edit-styles__item__icons">
          <i onClick={() => handleAlignChange('left')} data-tooltip-id='tip-left' className="fa-solid fa-align-left"></i>
          <i onClick={() => handleAlignChange('center')} data-tooltip-id='tip-center' className="fa-solid fa-align-center"></i>
          <i onClick={() => handleAlignChange('right')} data-tooltip-id='tip-right' className="fa-solid fa-align-right"></i>

          <Tooltip 
            id="tip-left" 
            header="Align Left" 
            place="top"
            background='#242529'
            fontWeight='600'
          />
              
          <Tooltip 
            id="tip-center" 
            header="Align Center" 
            place="top"
            background='#242529'
            fontWeight='600'
          />
          <Tooltip 
            id="tip-right" 
            header="Align Right" 
            place="top"
            background='#242529'
            fontWeight='600'
          />
    </div>
      <div className="edit-styles__container">
       
        <div className="edit-styles__item">
          <p>Type: </p>
          <select onChange={handleFontWeightChange}>
            <option value="h1">Header 1</option>
            <option value="h2">Header 2</option>
            <option value="h3">Header 3</option>
            <option value="h4">Header 4</option>
            <option value="h5">Header 5</option>
            <option value="h6">Header 6</option>

          </select>
        </div>
        <div className="edit-styles__item">
          <p>Font Family: </p>
          <select value={elementStyles?.fontFamily} onChange={handleFontFamilyChange}>
            {fontOptions.map((font, index) => (
              <option key={index} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
        </div>
      
        <div className="edit-styles__item">
          <p>Font Weight: </p>
          <select onChange={handleFontWeightChange}>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
            <option value="800">800</option>
            <option value="900">900</option>
          </select>
        </div>
        <div className="edit-styles__item">
          <p>Font Size: </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="range"
              min="8"
              max="72"
              value={fontSize || 16}  
              onChange={handleFontSizeSliderChange}
            />
            <input
              type="number"
              value={fontSize || 16}  
              onChange={handleFontSizeInputChange}
              style={{ width: '50px', textAlign: 'center' }}
            />
          </div>
        </div> 
      </div>
      <div ref={elementRef}></div> 
    </div>
  );
};

export default EditStyles;
