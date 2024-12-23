// React
import { useState, useEffect, useRef } from 'react'
import { BlockPicker } from 'react-color'

// Utilities
import Tooltip from '../../../../utilities/tooltip'
import { handleMouseUp, handleMouseDown, handleMouseMove } from '../../../../utilities/posts/editorFunctions'
import { handleBoldChange, handleItalicChange, handleUnderlineChange, handleMarginChange, handleColorChange, handleAlignChange, handleTypeChange, handleFamilyChange, handleWeightChange, handleSizeInputChange } from '../../../../utilities/posts/styleUtils'
import { handleClickOutside } from '../../../../utilities/domUtils'
// Data
import elements from '../../../../data/elements.json'

const EditStyles = ({ elementId, elementStyles, handleStyleChange, handleBlogPostElement, blogPostMainRef, selectedElement }) => {
  const [position, setPosition] = useState({ x: 0, y: 175, offsetX: 0, offsetY: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [style, setStyle] = useState({
    color: elementStyles?.color || '#000000',
    fontSize: elementStyles?.fontSize || 18,
    fontFamily: elementStyles?.fontFamily || '',
    fontWeight: elementStyles?.fontWeight || 'normal',
    currentType: elementStyles?.class || 'default-text',
    marginTop: elementStyles?.marginTop || 0,
    marginLeft: elementStyles?.marginLeft || 0,
    marginBottom: elementStyles?.marginBottom || 0,
    marginRight: elementStyles?.marginRight || 0,
  })
  const [showColorPicker, setShowColorPicker] = useState(false)
  const colorPickerRef = useRef(null)
  const elementRef = useRef(null)

  useEffect(() => {
    if (elementRef.current) {
      const computedStyle = window.getComputedStyle(elementRef.current)
      setStyle(prevStyle => ({
        ...prevStyle,
        fontSize: parseInt(computedStyle.fontSize, 10) || 18,
      }))
    }
  }, [elementId])

  useEffect(() => {
    if (elementStyles?.color !== style.color) setStyle(prevStyle => ({ ...prevStyle, color: elementStyles?.color || '#000000' }))
  }, [elementId, elementStyles?.color, style.color])

  useEffect(() => {
    const updatePosition = () => {
      if (blogPostMainRef.current) {
        const rect = blogPostMainRef.current.getBoundingClientRect()
        const xPos = rect.left
        setPosition(prev => ({ ...prev, x: xPos - 275 }))
      }
    }

    const onWindowLoad = () => {
      setTimeout(updatePosition, 100)  
    }

    if (window.document.readyState === 'complete') onWindowLoad()
    else window.addEventListener('load', onWindowLoad)

    return () => window.removeEventListener('load', onWindowLoad)
  }, [blogPostMainRef])

  useEffect(() => {
    if (selectedElement) {
      const computedStyle = window.getComputedStyle(selectedElement)
  
      setStyle(prevStyle => ({
        ...prevStyle,
        color: computedStyle.color || '#000000',
        fontSize: parseInt(computedStyle.fontSize, 10) || 18,
        fontFamily: computedStyle.fontFamily || '',
        fontWeight: computedStyle.fontWeight || 'normal',
        marginTop: parseInt(computedStyle.marginTop, 10) || 0,
        marginLeft: parseInt(computedStyle.marginLeft, 10) || 0,
        marginBottom: parseInt(computedStyle.marginBottom, 10) || 0,
        marginRight: parseInt(computedStyle.marginRight, 10) || 0,
      }))
    }
  }, [selectedElement, elementId])

  useEffect(() => {
    if (isDragging) {
      const mouseMoveHandler = handleMouseMove(isDragging, position, setPosition, elementRef)
      const mouseUpHandler = () => handleMouseUp(setIsDragging)
  
      document.addEventListener('mousemove', mouseMoveHandler)
      document.addEventListener('mouseup', mouseUpHandler)
  
      return () => {
        document.removeEventListener('mousemove', mouseMoveHandler)
        document.removeEventListener('mouseup', mouseUpHandler)
      }
    }
  }, [isDragging, position, setIsDragging])

  useEffect(() => {
    const handleColorPickerOutsideClick = (e) => handleClickOutside(colorPickerRef.current, e, '.color-picker-container')
    
    document.addEventListener('mousedown', handleColorPickerOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleColorPickerOutsideClick)
    }
  }, [])

  const toggleColorPicker = () => setShowColorPicker(!showColorPicker)

  return (
    <div className="edit-styles edit-text-styles" style={{ position: 'fixed', top: `${position.y}px`, left: `${position.x}px` }}>
      <div className="edit-styles__header" style={{ cursor: isDragging ? 'grabbing' : 'move' }} onMouseDown={(e) => handleMouseDown(e, setIsDragging, setPosition)} ref={elementRef}>
        <p>Edit Text:</p>
        <i onClick={() => handleBlogPostElement(null)} className="fa-solid fa-light fa-xmark"></i>
      </div>
      <div className="edit-styles__item edit-styles__item__icons">
        <i onClick={() => handleBoldChange(selectedElement, setStyle, handleStyleChange)} data-tooltip-id="tip-bold" className="fa-solid fa-bold"></i>
        <i onClick={() => handleItalicChange(selectedElement, handleStyleChange)} data-tooltip-id="tip-italic" className="fa-solid fa-italic"></i>
        <i onClick={() => handleUnderlineChange(selectedElement, handleStyleChange)} data-tooltip-id="tip-underline" className="fa-solid fa-underline"></i>
        <i data-tooltip-id="tip-color" onClick={toggleColorPicker} className="fa-solid fa-palette"></i>
        <Tooltip id="tip-bold" header="Bold" place="top" background="#242529" fontWeight="600" />
        <Tooltip id="tip-italic" header="Italic" place="top" background="#242529" fontWeight="600" />
        <Tooltip id="tip-underline" header="Underline" place="top" background="#242529" fontWeight="600" />
        <Tooltip id="tip-color" header="Color" place="top" background="#242529" fontWeight="600" />
        {showColorPicker && (
          <div className="color-picker-container" ref={colorPickerRef} style={{ position: 'absolute', zIndex: 2, top: '115px', left: '103px' }}>
            <BlockPicker color={style.color} onChange={(color) => handleColorChange(color, setStyle, handleStyleChange)} colors={elements.colorOptions} />
          </div>
        )}
      </div>
      <div className="edit-styles__item edit-styles__item__icons">
        <i onClick={() => handleAlignChange('left', selectedElement)} data-tooltip-id="tip-left" className="fa-solid fa-align-left"></i>
        <i onClick={() => handleAlignChange('center', selectedElement)} data-tooltip-id="tip-center" className="fa-solid fa-align-center"></i>
        <i onClick={() => handleAlignChange('right', selectedElement)} data-tooltip-id="tip-right" className="fa-solid fa-align-right"></i>
        <Tooltip id="tip-left" header="Align Left" place="top" background="#242529" fontWeight="600" />
        <Tooltip id="tip-center" header="Align Center" place="top" background="#242529" fontWeight="600" />
        <Tooltip id="tip-right" header="Align Right" place="top" background="#242529" fontWeight="600" />
      </div>
      <div className="edit-styles__container">
        <div className="edit-styles__item">
          <p>Font Family: </p>
          <select value={style.fontFamily} onChange={(e) => handleFamilyChange(e, setStyle, handleStyleChange)}>
            {elements.fontOptions.options.map((font, index) => (
              <option key={index} value={font} style={{ fontFamily: font }}>
                {font}
              </option>
            ))}
          </select>
        </div>
        <div className="edit-styles__item">
          <p>Type: </p>
          <select value={style.currentType} onChange={(e) => handleTypeChange(e, setStyle, handleStyleChange, selectedElement)}>
          {elements.text.classes?.filter(item => !item.exclude).map((item, index) => (
            <option value={item.class} key={index}>{item.text}</option>
          ))}
          </select>
        </div>
        <div className="edit-styles__item">
          <p>Font Weight: </p>
          <select value={style.fontWeight} onChange={(e) => handleWeightChange(e, setStyle, handleStyleChange)}>
            {elements.fontWeightOptions.options.map((weight, index) => (
              <option value={weight} key={index}>{weight}</option>
            ))}
          </select>
        </div>
        <div className="edit-styles__item">
          <p>Margin: </p>
          <div className="edit-styles__margin">
          <div className='edit-styles__margin__item'>
            <label>Top</label>
            <input 
              type="number" 
              min='0'
              value={style.marginTop || ''} 
              onChange={(e) => handleMarginChange(e, 'top', handleStyleChange, setStyle, style, selectedElement)} 
            />
          </div>
          <div className='edit-styles__margin__item'>
            <label>Left</label>
            <input 
              type="number" 
              value={style.marginLeft || ''} 
              onChange={(e) => handleMarginChange(e, 'left', handleStyleChange, setStyle, style, selectedElement)} 
            />
          </div>
          <div className='edit-styles__margin__item'>
            <label>Bottom</label>
            <input 
              type="number" 
              value={style.marginBottom || ''} 
              onChange={(e) => handleMarginChange(e, 'bottom', handleStyleChange, setStyle, style, selectedElement)} 
            />
          </div>
          <div className='edit-styles__margin__item'>
            <label>Right</label>
            <input 
              type="number" 
              value={style.marginRight || ''} 
              onChange={(e) => handleMarginChange(e, 'right', handleStyleChange, setStyle, style, selectedElement)} 
            />
          </div>
          </div>
        </div>
        <div className="edit-styles__item">
          <p>Font Size: </p>
          <input 
            type="number" 
            min="1" 
            value={style.fontSize || 0} 
            onChange={(e) => handleSizeInputChange(e, setStyle, handleStyleChange)} 
          />
        </div>
      </div>
    </div>
  )
}

export default EditStyles