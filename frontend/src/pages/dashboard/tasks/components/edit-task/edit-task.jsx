import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTaskContext } from '../../../../../contexts/TaskContext';
import { updateTaskStatus } from '../../../../../features/tasks/taskAction';

const EditTask = () => {
  const { selectedTask, setSelectedTask } = useTaskContext();
  const dispatch = useDispatch();
  const [localStatus, setLocalStatus] = useState(selectedTask ? selectedTask.status : '');

  const handleCheckboxChange = () => {
    const newStatus = localStatus === 'Completed' ? 'Incomplete' : 'Completed';
    setLocalStatus(newStatus);
    const updatedTask = { ...selectedTask, status: newStatus };
    setSelectedTask(updatedTask);
  };

  const savePendingChanges = () => {
    if (selectedTask && localStatus !== selectedTask.status) {
      dispatch(updateTaskStatus({ taskId: selectedTask._id, taskStatus: localStatus }));
    }
  };

  useEffect(() => {
    window.addEventListener('beforeunload', savePendingChanges);
    return () => {
      window.removeEventListener('beforeunload', savePendingChanges);
    };
  }, [selectedTask, localStatus]);

  useEffect(() => {
    if (selectedTask) {
      setLocalStatus(selectedTask.status);
    }
  }, [selectedTask]);

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
            checked={localStatus === 'Completed'}
            onChange={handleCheckboxChange}
          />
          <input
            type="text"
            defaultValue={selectedTask ? selectedTask.content : ''}
            className={localStatus === 'Completed' ? 'line-through' : ''}
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