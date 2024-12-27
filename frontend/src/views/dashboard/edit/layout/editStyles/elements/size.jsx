// React
import { useEditorContext } from '../../../../../../contexts/EditorContext'
import { handleSizeInputChange } from '../../../../../../utilities/posts/editor/styleUtils';

const Size = () => {
  const {
    style,
    setStyle,
    handleStyleChange
  } = useEditorContext();
  
  return (
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
  )
}

export default Size