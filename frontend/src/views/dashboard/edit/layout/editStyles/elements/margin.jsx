// React
import { useEditorContext } from '../../../../../../contexts/EditorContext'
import { handleMarginChange } from '../../../../../../utilities/posts/editor/styleUtils';

const Margin = () => {
  const {
    style,
    setStyle,
    handleStyleChange,
    selectedElement
  } = useEditorContext();
  
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
  )
}

export default Margin