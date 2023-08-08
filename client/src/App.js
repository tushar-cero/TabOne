// import React, { useContext, useEffect } from 'react';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home.js';
import Error from './pages/Error/Error.js';
import ClientAuth from './pages/ClientAuth/ClientAuth.js';

// import { UserContext } from './context/userContext.jsx';
// import { getUser } from './api/user.js';

function App() {

    // const {user, setUser} = useContext(UserContext);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response  = await getUser();
    //         setUser(response.data.user);
    //     }
    //     console.log("User data = ", user);
    //     fetchData();
    // })

    return (
	    <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/home" element={<Home/>}></Route>
            <Route exact path="/client_auth" element={<ClientAuth/>}></Route>
            <Route exact path="/error" element={<Error/>}></Route>
            <Route path="*" element={<Error/>}/>
	    </Routes>
    );
}

export default App;