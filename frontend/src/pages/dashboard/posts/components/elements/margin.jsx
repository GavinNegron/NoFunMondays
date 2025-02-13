import { useEditorContext } from '../../../../../contexts/EditorContext'

const Margin = () => {
  const {
    style,
    setStyle,
    selectedElement
  } = useEditorContext();
  
  const handleMarginChange = (e, direction) => {
    let value = parseInt(e.target.value.replace(/[^0-9]/g, ''), 10) || 0;
    const updatedStyleKey = `margin${direction.charAt(0).toUpperCase() + direction.slice(1)}`;
    
    setStyle(prevStyle => {
      const updatedStyle = { ...prevStyle, [updatedStyleKey]: value };
      return updatedStyle;
    });
    
    if (selectedElement) {
      selectedElement.style[updatedStyleKey] = `${value}px`;
    } else {
      console.warn('selectedElement is undefined or null');
    }
  }
  
  return (
  <div className="edit-styles__item">
      <p>Margin: </p>
      <div className="edit-styles__margin">
          <div className="edit-styles__margin__item">
              <label>Top</label>
              <input
              type="number"
              min='0'
              value={style.marginTop || ''}
              onChange={(e) => handleMarginChange(e, 'top')}
              />
          </div>
          <div className="edit-styles__margin__item">
              <label>Left</label>
              <input
              type="number"
              value={style.marginLeft || ''}
              onChange={(e) => handleMarginChange(e, 'left')}
              />
          </div>
          <div className="edit-styles__margin__item">
              <label>Bottom</label>
              <input
              type="number"
              value={style.marginBottom || ''}
              onChange={(e) => handleMarginChange(e, 'bottom')}
              />
          </div>
          <div className="edit-styles__margin__item">
              <label>Right</label>
              <input
              type="number"
              value={style.marginRight || ''}
              onChange={(e) => handleMarginChange(e, 'right')}
              />
          </div>
      </div>
  </div>
  )
}

export default Margin