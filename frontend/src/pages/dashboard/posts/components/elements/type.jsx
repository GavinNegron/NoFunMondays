import { useEditorContext } from '../../../../../contexts/EditorContext'
import elements from '../../../../../data/elements.json';

const Type = () => {
  const {
    style,
    setStyle,
    selectedElement,
    handleStyleChange
  } = useEditorContext();
  
  
const handleTypeChange = (e) => {
  const selectedClass = e.target.value;
  selectedElement.classList.forEach((className) => {
    if (className.startsWith('h') || className === 'default-text') {
      selectedElement.classList.remove(className);
    }
  });
  selectedElement.classList.add(selectedClass);

  setStyle(prevStyle => ({ ...prevStyle, currentType: e.target.value }));
};

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