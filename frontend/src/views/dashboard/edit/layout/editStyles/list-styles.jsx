import { useState, useEffect, useRef } from 'react'
import { BlockPicker } from 'react-color'

// Utilities
import { handleMouseMove, handleMouseUp, handleMouseDown } from '../../../../../utilities/posts/editor/editorFunctions'
import { handleBoldChange, handleItalicChange, handleUnderlineChange, handleMarginChange, handleColorChange, handleAlignChange, handleTypeChange, handleFamilyChange, handleWeightChange, handleSizeInputChange } from '../../../../../utilities/posts/editor/styleUtils'
import { handleClickOutside } from '../../../../../utilities/domUtils'
import Tooltip from '../../../../../utilities/tooltip'

// Data
import elements from '../../../../../data/elements.json'

const EditStyles = ({ handleBlogPostElement, blogPostMainRef, selectedElement, setSelectedElement, handleStyleChange, elementStyles }) => {
  const [position, setPosition] = useState({ x: 0, y: 175, offsetX: 0, offsetY: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [inputValues, setInputValues] = useState([])
  const [showColorPicker, setShowColorPicker] = useState(false)
  const colorPickerRef = useRef(null)
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
  const elementRef = useRef(null)

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
    if (selectedElement) {
      const liElements = selectedElement.querySelectorAll('ul li')
      liElements.forEach((li, index) => {
        console.log(`Item ${index + 1}:`, li.textContent)
      })
      const initialValues = Array.from(liElements).map(li => ({ textContent: li.textContent }))
      setInputValues(initialValues)
    }
  }, [selectedElement])

  const handleInputChange = (index, newValue) => {
    const updatedItems = [...inputValues]
    updatedItems[index].textContent = newValue
    setInputValues(updatedItems)

    if (selectedElement) {
      const liElements = selectedElement.querySelectorAll('ul li')
      const updatedLi = liElements[index]
      if (updatedLi) {
        updatedLi.textContent = newValue
      }
    }

    setSelectedElement(selectedElement)
  }

  useEffect(() => {
    const handleColorPickerOutsideClick = (e) => handleClickOutside(colorPickerRef.current, e, '.edit-styles__color-picker-container')

    document.addEventListener('mousedown', handleColorPickerOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleColorPickerOutsideClick)
    }
  }, [])

  const closeEditor = () => handleBlogPostElement(null)
  const toggleColorPicker = () => setShowColorPicker(!showColorPicker)
  return (
      <div className="edit-styles edit-list-styles" style={{ position: 'fixed', top: `${position.y}px`, left: `${position.x}px` }}>
        <div
          className="edit-styles__header"
          style={{ cursor: isDragging ? 'grabbing' : 'move' }}
          onMouseDown={(e) => handleMouseDown(e, setIsDragging, setPosition)}
          ref={elementRef}
        >
          <p>Edit List:</p>
          <i onClick={closeEditor} className="fa-solid fa-light fa-xmark"></i>
        </div>

        <div className="edit-styles__icons">
          <i onClick={() => handleBoldChange(style, setStyle)} data-tooltip-id="tip-bold" className="fa-solid fa-bold"></i>
          <i onClick={() => handleItalicChange(style, setStyle)} data-tooltip-id="tip-italic" className="fa-solid fa-italic"></i>
          <i onClick={() => handleUnderlineChange(style, setStyle)} data-tooltip-id="tip-underline" className="fa-solid fa-underline"></i>
          <i data-tooltip-id="tip-color" onClick={toggleColorPicker} className="fa-solid fa-palette"></i>
          <Tooltip id="tip-bold" header="Bold" place="top" background="#242529" fontWeight="600" />
          <Tooltip id="tip-italic" header="Italic" place="top" background="#242529" fontWeight="600" />
          <Tooltip id="tip-underline" header="Underline" place="top" background="#242529" fontWeight="600" />
          <Tooltip id="tip-color" header="Color" place="top" background="#242529" fontWeight="600" />
          {showColorPicker && (
            <div className="edit-styles__color-picker-container" ref={colorPickerRef} style={{ position: 'absolute', zIndex: 2, top: '115px', left: '103px' }}>
              <BlockPicker color={style.color} onChange={(color) => handleColorChange(color, style, setStyle)} />
            </div>
          )}
        </div>
        <div className="edit-styles__container">
          <div className="edit-styles__item">
            <div className="edit-styles__list">
              <div className="edit-styles__list__header">
                <span>List Items: </span>
              </div>
              {selectedElement ? 
                Array.from(selectedElement.querySelectorAll('ul li')).map((li, index) => (
                  <div className="edit-styles__list__content">
                     <input
                      type="text"
                      key={index}
                      value={inputValues[index] ? inputValues[index].textContent : ''}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                    <div className="edit-styles__list__button">
                      <button>Delete</button>
                    </div>
                  </div>
                )) : null
              }
            </div>
          </div>
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
            <p>Font Size: </p>
            <input
              className="edit-styles__item__size"
              type="number"
              min="1"
              value={style.fontSize || 0}
              onChange={(e) => handleSizeInputChange(e, setStyle, handleStyleChange)}
            />
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
              <div className="edit-styles__margin__item">
                <label>Top</label>
                <input
                  type="number"
                  min='0'
                  value={style.marginTop || ''}
                  onChange={(e) => handleMarginChange(e, 'top', handleStyleChange, setStyle, style, selectedElement)}
                />
              </div>
              <div className="edit-styles__margin__item">
                <label>Left</label>
                <input
                  type="number"
                  value={style.marginLeft || ''}
                  onChange={(e) => handleMarginChange(e, 'left', handleStyleChange, setStyle, style, selectedElement)}
                />
              </div>
              <div className="edit-styles__margin__item">
                <label>Bottom</label>
                <input
                  type="number"
                  value={style.marginBottom || ''}
                  onChange={(e) => handleMarginChange(e, 'bottom', handleStyleChange, setStyle, style, selectedElement)}
                />
              </div>
              <div className="edit-styles__margin__item">
                <label>Right</label>
                <input
                  type="number"
                  value={style.marginRight || ''}
                  onChange={(e) => handleMarginChange(e, 'right', handleStyleChange, setStyle, style, selectedElement)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default EditStyles
