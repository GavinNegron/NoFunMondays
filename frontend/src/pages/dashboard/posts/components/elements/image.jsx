// React
import { useEditorContext } from '../../../../../contexts/EditorContext'

const Image = () => {
  const {
    renderImageSelector
  } = useEditorContext();
  return (
    <div className="edit-styles__image">
        <div className="edit-styles__image__preview">
        {renderImageSelector()}
        </div>
    </div>
  )
}

export default Image