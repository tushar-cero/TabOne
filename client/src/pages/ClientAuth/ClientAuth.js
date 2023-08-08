import React, { useContext, useState } from 'react';
import Toast from '../../components/Toast/Toast.js';

import "./ClientAuth.css";

import { useNavigate } from 'react-router-dom';
import {UserContext} from '../../context/userContext.jsx';
import { register, login } from '../../api/user.js';

const ClientAuth = ({client_auth_type}) => {

    const navigate = useNavigate();
    const {user, setUser} = useContext(UserContext);

    const [ToastText, setToastText] = useState(""); 
    const [loginSignupDeterminant, setLoginSignupDeterminant] = useState(client_auth_type || false); // False — Login || True — Signup

    // ----- FORM COLLECTION -----
    
    const [nameInputField, setNameInputField] = useState("");
    const [emailInputField, setEmailInputField] = useState("");
    const [passwordInputField, setPasswordInputField] = useState("");

    // ----- FORM SUBMISSION + INPUT VALIDATIONS -----

    const formCollector = async (e) => {
        console.log("Form collector Entered.");
        // --- Input validation
        if (emailInputField.includes('@') && emailInputField.includes('.') && emailInputField.split('@')[0].length > 0 && emailInputField.split('@')[1].split('.')[0].length > 0 && emailInputField.split('.')[emailInputField.split('.').length - 1].length > 0) {
            console.log("Email is valid");
        } else {
            setToastText("Email is not valid");
        }
        // --- Form Submission
        if(loginSignupDeterminant) {
            // SIGNUP
            console.log("");
            e.preventDefault();
            const data = {
                name: nameInputField,
                email: emailInputField,
                password: passwordInputField
            };
            const response = await register(data);
            if (response.status === 201){
                setUser(response.data.user);
                console.log(user);
                console.log("User Registered ", response.data.user);
                navigate("/");
            } else {
                setToastText("Invalid data");
            }
            
        } else {
            // LOGIN
            e.preventDefault();
            const data = {
                email: emailInputField,
                password: passwordInputField
            };
            const response = await login(data);
            if (response.status === 200){
                setUser(response.data.user);
                console.log(user);
                console.log("User Loggedin ", response.data.user);
                navigate("/");
            } else {
                setToastText("Invalid data");
            }
        }
        console.log("Leaving Form Collector.");
    }

    return (
        <>
        <article className='Client_Auth'>
            {/* ------ Client AUTH IMAGE ----- */}

            <div className='Client_Auth_Left background_image'></div>

            {/* ------ Client AUTH FORM WRAPPER ----- */}

            <div className='Client_Auth_Right'>   
                <div className='app_logo background_image'></div>
                <div className='Client_Auth_Form'>
                    
                    <div className='Client_Auth_Form_Header'>
                        <h1>{loginSignupDeterminant?"Hey! Let's get you started.":"Welcome back! Let's go."}</h1>
                    </div>

                    <form className='Client_Auth_Form_Main'>
                        {loginSignupDeterminant && <div className='Client_Auth_Form_Main_input_field'>
                            <label htmlFor="username">Full Name</label>
                            <br/>
                            <input type="text" placeholder="Enter you full name" id="username" value={nameInputField} onChange={(event) => setNameInputField(event.target.value)}/>
                        </div>}
                        <div className='Client_Auth_Form_Main_input_field'>
                            <label htmlFor="email">Email Address</label>
                            <br/>
                            <input type="text" placeholder="Email Address" id="email" value={emailInputField} onChange={(event) => setEmailInputField(event.target.value)}/>
                        </div>
                        <div className='Client_Auth_Form_Main_input_field'>
                            <label htmlFor="password">Password</label>
                            <br/>
                            <input type="password" placeholder="Password" id="password" value={passwordInputField} onChange={(event) => setPasswordInputField(event.target.value)}/>
                        </div>
                    </form>

                    <div className="Client_Auth_Form_Footer">
                        <button onClick={()=>setLoginSignupDeterminant(!loginSignupDeterminant)}>{loginSignupDeterminant?"Already have an account? Log In":"Don't have an account? Sign up"}</button>
                        <button onClick={formCollector} className="btn btn_primary">{loginSignupDeterminant?"SIGN UP":"LOG IN"}</button>
                    </div>

                </div>
            </div>
        </article>
        <Toast text={ToastText}/>
        </>
    );
}

export default ClientAuth;