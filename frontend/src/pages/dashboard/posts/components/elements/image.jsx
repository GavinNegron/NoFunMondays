import { useEditorContext } from '@/contexts/EditorContext'

const Image = () => {
  const {
    renderImageSelector,
    selectedElement,
    setStyle
  } = useEditorContext();
  
  const handleAltChange = (e) => {
    selectedElement.querySelector('img').alt = e.target.value;
    console.log(selectedElement.querySelector('img').alt)
    setStyle(prevStyle => ({ ...prevStyle, fontFamily: e.target.value }));
  };

  return (
    <div className="edit-styles__item">
      <div className="edit-styles__image">
          <div className="edit-styles__image__preview">
            <p>Select Image: </p>
            {renderImageSelector()}
          </div>
          <div className="edit-styles__image__alt">
            <p>Add alt text: </p>
            <textarea onChange={(e) => handleAltChange(e)} spellCheck='false' placeholder="Enter alt text here:"/>
          </div>
      </div>
    </div>
  )
}

export default Image