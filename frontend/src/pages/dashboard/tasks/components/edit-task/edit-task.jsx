import { useState } from 'react'

const EditTask = () => {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div className="edit-task edit-styles edit-embed-styles">
      <div className="edit-task__header">
        <p>Edit Task:</p>
        <i className="fa-solid fa-light fa-xmark"></i>
      </div>
      <div className="edit-task__container">
        <div className="edit-task__item">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <input
            type="text"
            defaultValue="This is a test task that needs edited"
            className={isChecked ? 'line-through' : ''}
          />
        </div>
        <div className="edit-task__item">
          test 2
        </div>
      </div>
    </div>
  )
}

export default EditTask