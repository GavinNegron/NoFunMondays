import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../../../features/tasks/taskSlice/fetchTasks';
import { handleDoubleClick } from '../../../../utilities/tasks/taskFunctions';
import { useEditorContext } from '../../../../contexts/EditorContext';

const TasksToDo = ({ title }) => {
  const dispatch = useDispatch();
  const { tasks = [], isLoading } = useSelector((state) => state.tasks);
  const {
    setSelectedElement, 
    setPost, 
    setPostElements
  } = useEditorContext();
  const [taskLimit, setTaskLimit] = useState(10);

  useEffect(() => {
    dispatch(fetchTasks({ limit: taskLimit, excludeFeatured: false }));
  }, [dispatch, taskLimit]);

  const filteredTasks = tasks.filter(task => {
    if (title === "To-Do") return task.status === "NotStarted";
    if (title === "In Progress") return task.status === "InProgress";
    if (title === "Completed") return task.status === "Completed";
    return false;
  });

  return (
   <>
   <div className="list-group">
    <div className="list-group__container">
        <div className="list-group__header">
          <div className="list-group__header-text">
            <span>{title}: ({filteredTasks.length})</span>
          </div>
          <div className="list-group__header-icon">
            <i className="fa-solid fa-ellipsis"></i>
          </div>
        </div>
        <div className="list-group__grid">
          {isLoading ? (
            <div>Loading...</div>
          ) : filteredTasks.length === 0 ? (
            <div>You have completed all tasks.</div>
          ) : (
            filteredTasks.map((task) => (
              <div className="list-group__grid-item" key={task._id}>
                <div className="list-group__grid-item-tag">
                  <span>{task.tag}</span>
                </div>
                <div className="list-group__grid-item-text">
                  <span onDoubleClick={(e) => handleDoubleClick(e, setSelectedElement, setPost, setPostElements)}>
                    {task.content}
                  </span>
                </div>
                <div className="list-group__grid-item-bottom">
                  <span>{task.dueDate}</span>
                </div>
              </div>
            ))
          )}
        </div>
    </div>
   </div>
   </>
  )
}

export default TasksToDo;
