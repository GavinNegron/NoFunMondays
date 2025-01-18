import './edit-task.sass'

const EditTask = () => {

  return (
    <div
      className="edit-task edit-styles edit-embed-styles"
    >
      <div
        className="edit-task__header"
      >
        <p>Edit Task:</p>
        <i className="fa-solid fa-light fa-xmark"></i>
      </div>
      <div className="edit-task__container">
        <div className="edit-task__item">
          <input type="checkbox" name="" id="" />
          <input type="text" value={'This is a test task that needs edited'}/>
        </div>
        <div className="edit-task__item">
          test 2
        </div>
      </div>
    </div>
  )
}

export default EditTask