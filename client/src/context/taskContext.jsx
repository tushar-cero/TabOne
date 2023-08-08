import {createContext, useState} from 'react';

export const TaskContext = createContext({tasks:{}, setTasks:()=>{}});

export const TaskContextProvider = ({children}) => {
    const [tasks, setTasks] = useState({});
    return (
        <TaskContext.Provider value={{tasks, setTasks}}>
            {children}
        </TaskContext.Provider>
    )
}