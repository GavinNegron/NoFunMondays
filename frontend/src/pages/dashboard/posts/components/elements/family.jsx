import { useEditorContext } from '@/contexts/EditorContext'
import elements from '@/data/elements'

const Family = () => {
  const {
    style, 
    selectedElement,
    setStyle
  } = useEditorContext();
  
  const handleFamilyChange = (e) => {
    selectedElement.style.fontFamily = e.target.value;
    setStyle(prevStyle => ({ ...prevStyle, fontFamily: e.target.value }));
  };

  return (
    <div className="edit-styles__item">
      <p>Font Family: </p>
      <select value={style.fontFamily} onChange={(e) => handleFamilyChange(e)}>
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