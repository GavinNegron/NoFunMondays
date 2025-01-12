import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../../../../features/tasks/taskSlice/fetchTasks';
import { handleDoubleClick } from '../../../../utilities/tasks/taskFunctions';
import { useEditorContext } from '../../../../contexts/EditorContext';

const TasksToDo = () => {
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

  return (
   <>
   <div className="list-group">
    <div className="list-group__container">
        <div className="list-group__header">
          <div className="list-group__header-text">
            <span>To-Do: ({tasks.length})</span>
          </div>
        </div>
        <div className="list-group__grid">
          {isLoading ? (
            <div>Loading...</div>
          ) : tasks.length === 0 ? (
            <div>You have completed all tasks.</div>
          ) : (
            tasks.map((task) => (
              <div className="list-group__grid__item" key={task._id}>
                <div className="list-group__grid__item-element list-group__grid__item-tag">
                  <span>{task.tag}</span>
                </div>
                <div className="list-group__grid__item-element list-group__grid__item-text">
                  <span onDoubleClick={(e) => handleDoubleClick(e, setSelectedElement, setPost, setPostElements)}>
                    {task.content}
                  </span>
                </div>
                <div className="list-group__grid__item-element list-group__grid__item-bottom">
                  <span>{task.status}</span>
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
