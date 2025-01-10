import React from 'react'
import { handleDoubleClick } from '../../../../utilities/tasks/taskFunctions'
import { useEditorContext } from '../../../../contexts/EditorContext'

const TasksToDo = ({title}) => {
  const {
    setSelectedElement, 
    setPost, 
    setPostElements
  } = useEditorContext();

  return (
   <>
   <div className="list-group">
    <div className="list-group__container">
        <div className="list-group__header">
          <div className="list-group__header-text">
            <span>{title}: ({3})</span>
          </div>
          <div className="list-group__header-icon">
            <i className="fa-solid fa-ellipsis"></i>
          </div>
        </div>
        <div className="list-group__grid">
          <div className="list-group__grid-item">
            <div className="list-group__grid-item-tag">
              <span>Utilities</span>
            </div>
            <div className="list-group__grid-item-text">
              <span onDoubleClick={(e) => handleDoubleClick(e, setSelectedElement, setPost, setPostElements)}>Update google images to delete image after remove.</span>
            </div>
            <div className="list-group__grid-item-bottom">
              <span></span>
            </div>
          </div>
        </div>
    </div>
   </div>
   </>
  )
}

export default TasksToDo