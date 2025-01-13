import { useState, useEffect, useRef } from 'react'

// Elements
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
      </div>
    </div>
  )
}

export default EditTask