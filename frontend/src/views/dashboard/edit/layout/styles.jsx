import { useState, useEffect, useRef, useCallback } from 'react';
import { SketchPicker } from 'react-color';

const EditStyles = ({ elementId, elementStyles, handleStyleChange, handleBlogPostElement, blogPostMainRef }) => {
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
      setPosition(prev => ({
        ...prev,
        x: e.clientX - prev.offsetX,
        y: e.clientY - prev.offsetY,
      }));
    }
  }, [isDragging]);

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

  return (
    <div
      className="edit-styles"
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
        <div className="edit-styles__item">
        <p>Color: </p>
        <div
          className="color-swatch"
          style={{
            backgroundColor: selectedColor,
            width: '30px',
            height: '30px',
            cursor: 'pointer',
            borderRadius: '4px',
          }}
          onClick={toggleColorPicker}
        ></div>
        {showColorPicker && (
          <div className="color-picker-container" ref={colorPickerRef} style={{ position: 'absolute', zIndex: 2 }}>
            <SketchPicker color={selectedColor} onChange={handleColorChange} />
          </div>
        )}
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
    
      <div ref={elementRef}></div> 
    </div>
  );
};

export default EditStyles;
