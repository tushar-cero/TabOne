import React, { useState } from 'react';
import "./TaskCard.css";

const color = ['red', 'blue', 'orange'];
const TaskCard = ({task, priority}) => {
    
    const [handleTaskStatus, setHandleTaskStatus] = useState(false); 

    const handleEditButton = () => {
        const add_task_overlay_element = document.getElementById('AddNewTaskOverlay');
        add_task_overlay_element.className = 'AddNewTaskOverlay';
    }

    return (
        <div id='TaskCard' className={handleTaskStatus?'TaskCard TaskDoneCard':'TaskCard'} style={{'borderLeft': `${color[priority-1]} 10px solid`}}>
            <div className='TaskCard_task'>
                <p className={handleTaskStatus?'strike_through':''}>{task}</p>
                <sub>03 Jul 2023</sub>
            </div>
            <div className='TaskCard_Options'>
                <button onClick={()=>handleEditButton()} className='TaskCard_button' id='TaskCard_button_edit' disabled={handleTaskStatus}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.19791 18.5829L4.71128 15.0641C4.74222 14.8338 4.84734 14.6197 5.01075 14.4545L14.9574 4.49708C15.0863 4.36689 15.2464 4.27197 15.4224 4.22141C15.5985 4.17084 15.7845 4.16633 15.9628 4.20831C16.8761 4.46113 17.7039 4.95635 18.3586 5.64149C19.0414 6.30039 19.533 7.132 19.7811 8.04795C19.823 8.22623 19.8185 8.4123 19.768 8.58834C19.7174 8.76438 19.6225 8.92448 19.4923 9.05331L9.53489 19C9.36962 19.1634 9.15561 19.2685 8.92526 19.2995L5.40648 19.8128C5.24031 19.8368 5.07082 19.8214 4.91172 19.7677C4.75263 19.714 4.60841 19.6237 4.49074 19.5039C4.37306 19.3841 4.28523 19.2384 4.23436 19.0784C4.18349 18.9183 4.171 18.7486 4.19791 18.5829Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M13.0751 6.39015L17.6099 10.925" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
                <button onClick={()=>setHandleTaskStatus(!handleTaskStatus)} className='TaskCard_button'>
                    <i id='TaskCard_button' className={handleTaskStatus?'fa fa-check':'fa fa-circle-o'}></i>
                </button>
            </div>
        </div>
    );
}

export default TaskCard;