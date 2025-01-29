import React, { createContext, useState, useContext } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <TaskContext.Provider value={{ 
        selectedTask, 
        setSelectedTask 
        }}>
     
     {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);