// React
import { useEditorContext } from '../../../../../contexts/EditorContext'

const Embed = () => {
  const {
    style, 
    setStyle,
    handleStyleChange,
  } = useEditorContext();
  
  return (
    <div className="edit-styles__item">
      <p>Embed Url: </p>
      <input type="text" placeholder='Enter Url' />
    </div>
  )
}

export default Embed