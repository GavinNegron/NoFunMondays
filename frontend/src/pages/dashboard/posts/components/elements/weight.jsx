import { useEditorContext } from '@/contexts/EditorContext'
import elements from '@/data/elements.json';

const Weight = () => {
  const {
    style,
    setStyle,
    selectedElement
  } = useEditorContext();
  
  const handleWeightChange = (e) => {
    selectedElement.style.fontWeight = e.target.value;
    setStyle(prevStyle => ({ ...prevStyle, fontWeight: e.target.value }));
  };

  return (
    <div className="edit-styles__item">
        <p>Font Weight: </p>
        <select value={style.fontWeight} onChange={(e) => handleWeightChange(e)}>
        {elements.fontWeightOptions.options.map((weight, index) => (
            <option value={weight} key={index}>{weight}</option>
        ))}
        </select>
    </div>
  )
}

export default Weight