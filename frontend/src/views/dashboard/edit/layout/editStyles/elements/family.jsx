// React
import { useEditorContext } from '../../../../../../contexts/EditorContext'
import elements from '../../../../../../data/elements.json'
import { handleFamilyChange } from '../../../../../../utilities/posts/editor/styleUtils';

const Family = () => {
  const {
    style, 
    setStyle,
    handleStyleChange,
  } = useEditorContext();
  
  return (
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
  )
}

export default Family