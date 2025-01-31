// REACT
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery'
import { useTaskContext } from '../../../../../contexts/TaskContext';

// COMPONENTS
import LoadingScreen from '@/components/base/loading'

// FEATURES
import { fetchTasks } from '../../../../../features/tasks/taskAction';

const TasksToDo = () => {
  const { selectedTask, setSelectedTask } = useTaskContext();

  const dispatch = useDispatch();
  const { tasks, isLoading } = useSelector((state) => state.tasks.task);
  const [taskLimit] = useState(6);
  const [loadingState, setLoadingState] = useState(true); 

  useEffect(() => {
    const handleLoading = async () => {
      setLoadingState(true); 
      try {
        dispatch(fetchTasks({ taskLimit: taskLimit }));
        await new Promise((resolve) => setTimeout(resolve, 500)); 
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setLoadingState(false); 
      }
    };
    handleLoading();
  }, [dispatch, taskLimit]);

  const handleTaskClick = (e, task) => {
    if (selectedTask && selectedTask._id === task._id) {
      $('.edit-task').stop(true, true).toggle();
    } else {
      const updatedTask = tasks.find((t) => t._id === task._id) || task;
      setSelectedTask(updatedTask);
      $('.edit-task').stop(true, true).show();
    }
  };
  

  useEffect(() => {
    if (tasks.length > 0) {
      return;
    }
  }, [tasks]);


  if(loadingState) {
    return (
      <LoadingScreen/>
    )
  }
  return (
   <>
   <div className="list-group">
    <div className="list-group__container">
        <div className="list-group__header">
          <div className="list-group__header__text">
            <span>To-Do: ({tasks.length})</span>
          </div>
        </div>
        <div className="list-group__grid">
          {isLoading ? (
            <div>Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div>You have completed all tasks.</div>
          ) : (
            tasks.map((task) => (
              <div className="list-group__grid__item" key={task._id} onClick={(e) => handleTaskClick(e, task)}>
                <div className="list-group__grid__item__element list-group__grid__item--tag">
                  <span>{task.tag}</span>
                </div>
                <div className="list-group__grid__item__element list-group__grid__item--text">
                  <span>
                    {task.content}
                  </span>
                </div>
                <div className="list-group__grid__item__element list-group__grid__item--bottom">
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