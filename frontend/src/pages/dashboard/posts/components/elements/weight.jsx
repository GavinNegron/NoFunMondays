// React
import { useEditorContext } from '../../../../../contexts/EditorContext'
import { handleWeightChange } from '../../../../../utilities/posts/editor/styleUtils';
import elements from '../../../../../data/elements.json';

const Size = () => {
  const {
    style,
    setStyle,
    handleStyleChange
  } = useEditorContext();
  
  return (
    <div className="edit-styles__item">
        <p>Font Weight: </p>
        <select value={style.fontWeight} onChange={(e) => handleWeightChange(e, setStyle, handleStyleChange)}>
        {elements.fontWeightOptions.options.map((weight, index) => (
            <option value={weight} key={index}>{weight}</option>
        ))}
        </select>
    </div>
  )
}

export default Size