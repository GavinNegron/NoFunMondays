// React
import { useEditorContext } from '../../../../../../contexts/EditorContext'
import { handleListChange } from '../../../../../../utilities/posts/editor/styleUtils'
import { handleDelete } from '../../../../../../utilities/posts/editor/editorFunctions'

const List = () => {
  const {
    selectedElement,
    inputValues,
    setInputValues,
    setPostElements,
    setDeletedElements,
    setSelectedElement,
    handleInputChange,
  } = useEditorContext();
  
  return (
    <div className="edit-styles__item">
    <div className="edit-styles__list">
      <div className="edit-styles__list__header">
        <span>List Items: </span>
        <i className="fa-solid fa-plus"></i>
      </div>
      {selectedElement ? 
        Array.from(selectedElement.querySelectorAll('ul li')).map((li, index) => (
          <div className="edit-styles__list__content" key={index}>
            <input
              type="text"
              value={inputValues[index] ? inputValues[index].textContent : ''}
              onChange={(e) => handleInputChange(index, e.target.value)}
            />
            <div className="edit-styles__list__delete">
              <button onClick={(event) => handleListChange(event, index, selectedElement, inputValues, setInputValues, handleDelete, setPostElements, setDeletedElements, setSelectedElement)}>
                <i className="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </div>
        )) : null
      }
    </div>
  </div>
  )
}

export default List