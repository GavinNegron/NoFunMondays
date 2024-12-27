// React
import { useEditorContext } from '../../../../../../contexts/EditorContext'
import { handleTypeChange } from '../../../../../../utilities/posts/editor/styleUtils';
import elements from '../../../../../../data/elements.json';

const Type = () => {
  const {
    style,
    setStyle,
    selectedElement,
    handleStyleChange
  } = useEditorContext();
  
  return (
    <div className="edit-styles__item">
        <p>Type: </p>
        <select value={style.currentType} onChange={(e) => handleTypeChange(e, setStyle, handleStyleChange, selectedElement)}>
        {elements.text.classes?.filter(item => !item.exclude).map((item, index) => (
        <option value={item.class} key={index}>{item.text}</option>
        ))}
        </select>
    </div>
  )
}

export default Type