import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import {logout} from '../../api/user.js'
import './Home.css';
import TaskCard from '../../components/TaskCard/TaskCard';
import AddNewTask from '../../components/AddNewTask/AddNewTask';
import Toast from '../../components/Toast/Toast';

// ----- Task Data

const userTasksData = [
    {
      id: 1,
      priority: 2,
      task: 'Write a blog post'
    },
    {
      id: 2,
      priority: 2,
      task: 'Send out an email newsletter'
    },
    {
      id: 3,
      priority: 1,
      task: 'Create a new marketing campaign'
    },
    {
      id: 4,
      priority: 3,
      task: 'Meet with the sales team'
    },
    {
      id: 5,
      priority: 1,
      task: 'Work on the new product launch'
    },
    {
      id: 6,
      priority: 2,
      task: 'Update the company website'
    },
    {
      id: 7,
      priority: 3,
      task: 'Prepare for the board meeting'
    },
    {
      id: 8,
      priority: 1,
      task: 'Research new market opportunities'
    },
    {
      id: 9,
      priority: 2,
      task: 'Plan the next team building event'
    },
    {
      id: 10,
      priority: 3,
      task: 'Review and approve the budget proposal'
    }
];
  

const Home = () => {

    // ----- DATE FORMATER
    const currentDate = new Date();
    const options = { day: '2-digit', month: 'long', year: 'numeric', weekday: 'long'};
    const formattedDate = currentDate.toLocaleDateString('en-GB', options);

    // ----- HANDING SEARCH 
    const [sentence, setSentence] = useState("");
    
    const handleGoogleSearch = () => {
        const googleSearchURL = "https://www.google.com/search?q=" + encodeURIComponent(sentence).replace(/%20/g, "+"); 
        // console.log(googleSearchURL);
        const newTab = window.open(googleSearchURL, "_blank");
        if (newTab) {
            newTab.focus();
        }
    };
    const handleBingSearch = () => {
        const bingSearchURL = "https://www.bing.com/search?q=" + encodeURIComponent(sentence).replace(/%20/g, "+"); 
        // console.log(bingSearchURL);
        const newTab = window.open(bingSearchURL, "_blank");
        if (newTab) {
            newTab.focus();
        }
    };
    const handleDuckDuckGoSearch = () => {
        const duckDuckGoSearchURL = "https://duckduckgo.com/?va=v&t=ha&q=" + encodeURIComponent(sentence).replace(/%20/g, "+"); 
        // console.log(duckDuckGoSearchURL);
        const newTab = window.open(duckDuckGoSearchURL, "_blank");
        if (newTab) {
            newTab.focus();
        }
    };

    // ------ HANDLE NEW TASK MODAL TOGGLE
    const handleNewTaskCardToggle = () => {
        const add_new_task_modal_element = document.getElementById('AddNewTaskOverlay');
        add_new_task_modal_element.className = 'AddNewTaskOverlay';
    }

    // ------ HANDLE HEADER'S PROFILE MENU TOGGLE
    
    const [isContextMenuVisible, setContextMenuVisible] = useState(false);    
    
    // ------ HANDLE INPUT ENTER IN SEARCH
    const [ToastText, setToastText] = useState("");
    const handleKeyDown = (e) => {
        if(e) {
            if (e.key === 'Enter' && sentence.trim() !== '') {
                setToastText("Please click on the search engine button to initiate search");
                const element = document.getElementById('Toast');
                element.className = 'Toast';
            }
            setTimeout(()=> {
                const element = document.getElementById('Toast');
                element.className = 'Toast_Close';
            }, 5000);
        }
    };
    
    // ------ LOGOUT HANDLER
    const {user, setUser} = useContext(UserContext);
    const logOutHandler = async (e) => {
        e.preventDefault();
        const response = await logout();
        if (response.status === 200){
            setUser({});
            console.log(user);
            console.log("User Loggedin ", response.data.user);
        } else {
            setToastText("ERROR: Cannot log out");
        }
    }



    return (
        <React.Fragment>
            <header>
                <div className="flex_space_between">
                    <div className="logo background_image_contain"></div>
                    <div className="header_options_wrapper">
                        <a href="https://chat.openai.com" rel="noreferrer" target="_blank"><span className="background_image_contain openai_chatgpt"></span> ChatGPT</a>
                        <a href="https://bard.google.com" rel="noreferrer" target="_blank"><span className="background_image_contain google_bard"></span> Bard</a>
                        <a href="https://www.bing.com/search?q=Bing+AI&showconv=1&FORM=hpcodx" rel="noreferrer" target="_blank"><span className="background_image_contain bing_ai"></span> Bing</a>
                        <div className='user_profile_wrapper'>
                            <button onClick={()=>setContextMenuVisible(!isContextMenuVisible)}><div className="user_profile background_image"></div></button>
                            <ul id="profile_context_menu" className={isContextMenuVisible ? "profile_context_menu" : "profile_context_menu_closed"}>
                                {(user._id)?
                                    <li><button onClick={logOutHandler}><span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.2692 19.9464H8.85459C7.74413 19.9977 6.65816 19.6094 5.83188 18.8658C5.0056 18.1221 4.50552 17.0829 4.43994 15.9732V8.02682C4.50552 6.91711 5.0056 5.87789 5.83188 5.13424C6.65816 4.39058 7.74413 4.00236 8.85459 4.05364H13.2692" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19.5601 12H8.08197" stroke="var(--primary-color)" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/><path d="M15.5097 16.4147L19.2953 12.6291C19.461 12.4617 19.5541 12.2356 19.5541 12C19.5541 11.7644 19.461 11.5383 19.2953 11.3709L15.5097 7.58536" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span> Log Out</button></li>
                                    :
                                    <li><Link to='/client_auth'><span><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 20.5C19 17.19 15.31 14.5 12 14.5C8.69 14.5 5 17.19 5 20.5" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 11.5C14.2091 11.5 16 9.70914 16 7.5C16 5.29086 14.2091 3.5 12 3.5C9.79086 3.5 8 5.29086 8 7.5C8 9.70914 9.79086 11.5 12 11.5Z" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></span> USER LOGIN</Link></li>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

            <article className="Landing">
                        
                <div className="landing_search">  
                    <div className='landing_search_header'>
                        <h1>TabOne Search</h1>
                        <p>Quickly search the web using popular search engines.</p>
                    </div>
                    <div className="search_field">
                        <i className="fa fa-search"></i>
                        <input type="text" placeholder="Search here..." value={sentence} onChange={(e) => setSentence(e.target.value)} onKeyDown={(e)=>handleKeyDown(e)}/>
                        <span className="search_options">
                            <button onClick={()=>handleGoogleSearch()} className="background_image_contain search_btn google_search_btn"></button>
                            <button onClick={()=>handleBingSearch()} className="background_image_contain search_btn bing_search_btn"></button>
                            <button onClick={()=>handleDuckDuckGoSearch()} className="background_image_contain search_btn duckduckgo_search_btn"></button>
                        </span>
                    </div>
                </div>
                
                <div className="landing_tasks">
                    <div className="landing_tasks_header">
                        <div> 
                            <h2>TASK'S TODAY</h2>
                            <p>{formattedDate}</p>
                        </div>
                        <button onClick={()=>handleNewTaskCardToggle()} className='btn btn_primary'><i className="fa fa-plus"></i>&nbsp;&nbsp; NEW</button>
                    </div>
                    <div className="landing_tasks_main">
                    {userTasksData.map((task_each) => (
                        <TaskCard key={task_each.id} task={task_each.task} priority={task_each.priority}/>
                    ))}
                    </div>
                </div>

            </article>
            

            <footer>
                <div className="container">
                    
                </div>
            </footer>
            
            <>
                <AddNewTask/>
                <Toast text={ToastText}/>
            </>

        </React.Fragment>
    );
}

export default Home;