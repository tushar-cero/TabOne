import React from "react";
import "./index.css";
import {createRoot} from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import App from "./App";
import { UserContextProvider } from "./context/userContext";
import { TaskContextProvider } from "./context/taskContext";

// import reportWebVitals from './reportWebVitals';

const getRoot = document.getElementById('root');
const root = createRoot(getRoot);

root.render(
	<UserContextProvider>
		<TaskContextProvider>
			<HashRouter>
    			<App />
  			</HashRouter>
		</TaskContextProvider>
	</UserContextProvider>
);