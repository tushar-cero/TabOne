import React, { useState } from 'react';
import './AddNewTask.css';
import { createTask } from '../../api/tasks';

// {task_name, priority, date}
const AddNewTask = () => {

    // ----- Data Handler

    const [taskName, setTaskName] = useState("");
    const [priority, setPriority] = useState(1);
    const [taskDate, setTaskDate] = useState("");

    const createTaskHandler = async (e) => {
        e.preventDefault();
        const data = {
            task_description : taskName,
            completed : false,
            date : taskDate,
            priority : priority
        }
        console.log(data);
        const response = await createTask(data);
        if(response.status === 201) {
            handleAddNewTaskComponentToggle();
        } else {
            console.log(response.data.message);
        }
    }

    // ----- Toggle Handler
    const handleAddNewTaskComponentToggle = () => {
        const add_task_overlay_element = document.getElementById('AddNewTaskOverlay');
        add_task_overlay_element.className = 'AddNewTaskOverlay_Close';
    }
    
    return (
        <div id='AddNewTaskOverlay' className='AddNewTaskOverlay_Close'>
            <div className='AddNewTask'>
                <div className='AddNewTask_Header'>
                    <p>Create a new task</p>
                    <button onClick={()=>handleAddNewTaskComponentToggle()}>
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18.4555 5.54446L5.54443 18.4555" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M18.4555 18.4555L5.54443 5.54446" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
                <div className='AddNewTask_Main'>
                    <div className='AddNewTask_Main_Task'>
                        <label>Title</label>
                        <input name='title' type='text' placeholder='Write a blog post...'  value={taskName} onChange={(event) => setTaskName(event.target.value)}/>
                    </div>
                    <div className='AddNewTask_Main_Task'>
                        <label>Priority</label>
                        <div className='AddNewTask_Main_Task_Option'>
                            <input name='radio' type='radio' onChange={(event) => setPriority(1)}/>
                            <span>High</span>
                        </div>
                        <div className='AddNewTask_Main_Task_Option'>
                            <input name='radio' type='radio' onChange={(event) => setPriority(2)}/>
                            <span>Medium</span>
                        </div>
                        <div className='AddNewTask_Main_Task_Option'>
                            <input name='radio' type='radio' onChange={(event) => setPriority(3)}/>
                            <span>Low</span>
                        </div>
                    </div>
                    <div className='AddNewTask_Main_Task'>
                        <label>What's the deadline?</label>
                        <input name='date' type='date'  value={taskDate} onChange={(event) => setTaskDate(event.target.value)}/>
                        <sub>Click on the calendar icon to open.</sub>
                    </div>
                </div>
                <div className='AddNewTask_Footer'>
                    <button onClick={createTaskHandler} className='btn btn_primary'><i className='fa fa-plus'></i> Create Task</button>
                    <button className='btn btn_secondary'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 6.5H18V18C18 18.663 17.7366 19.2989 17.2678 19.7678C16.7989 20.2366 16.163 20.5 15.5 20.5H8.5C7.83696 20.5 7.20107 20.2366 6.73223 19.7678C6.26339 19.2989 6 18.663 6 18V6.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M4 6.5H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 6.5V5C9 4.60218 9.15804 4.22064 9.43934 3.93934C9.72064 3.65804 10.1022 3.5 10.5 3.5H13.5C13.8978 3.5 14.2794 3.65804 14.5607 3.93934C14.842 4.22064 15 4.60218 15 5V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNewTask;