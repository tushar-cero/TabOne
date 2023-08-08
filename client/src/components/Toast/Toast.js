import React from 'react';
import "./Toast.css";

const handleModalComponent = () => {
    const element = document.getElementById('Toast');
    element.className = 'Toast_Close';
}

const Toast = ({text}) => {
    return (
        <div id='Toast' className='Toast_Close'>
            <p>{text}</p>
            <button onClick={()=>handleModalComponent()}><i className='fa fa-close'></i></button>
        </div>
    );
}

export default Toast;