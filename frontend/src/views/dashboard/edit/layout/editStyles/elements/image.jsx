// React
import { useEditorContext } from '../../../../../../contexts/EditorContext'

const Image = () => {
  const {
    selectedElement,
    imageUrl,
    renderImageSelector
  } = useEditorContext();
  
  return (
    <div className="edit-styles__image">
        <div className="edit-styles__image__preview">
        {(selectedElement?.classList.contains('image') || (selectedElement?.classList.contains('banner') && imageUrl)) && renderImageSelector()}
        </div>
    </div>
  )
}

export default Image