import { useEditorContext } from '@/contexts/EditorContext'

const Image = () => {
  const {
    renderImageSelector
  } = useEditorContext();
  return (
    <div className="edit-styles__item">
      <div className="edit-styles__image">
          <div className="edit-styles__image__preview">
          <p>Select Image: </p>
          {renderImageSelector()}
          </div>
      </div>
    </div>
  )
}

export default Image