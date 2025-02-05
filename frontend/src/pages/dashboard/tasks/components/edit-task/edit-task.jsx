import React from 'react';
import { useDispatch } from 'react-redux';
import { useTaskContext } from '../../../../../contexts/TaskContext';
import { updateTaskStatus } from '../../../../../features/tasks/taskAction';

const EditTask = () => {
  const { selectedTask, setSelectedTask } = useTaskContext();
  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    const newStatus = selectedTask?.status === 'Completed' ? 'Uncompleted' : 'Completed';
  
    dispatch(updateTaskStatus({ taskId: selectedTask._id, taskStatus: newStatus }));
  
    setSelectedTask((prevTask) => ({
      ...prevTask,
      status: newStatus,
    }));
  };
  
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
            checked={selectedTask?.status === 'Completed'}
            onChange={handleCheckboxChange}
          />
          <input
            type="text"
            defaultValue={selectedTask ? selectedTask.content : ''}
            className={selectedTask?.status === 'Completed' ? 'line-through' : ''}
          />
        </div>
        <div className="edit-task__item">
          test 2
        </div>
      </div>
    </div>
  );
};

export default EditTask;