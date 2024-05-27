import { createRoot } from 'react-dom/client';
import React from 'react';
import './index.css';
import App from './App';
import './mock/browser.js'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useEffect } from "react";

async function deferRender() {
    const { worker } = await import('./mock/browser.js');
    return worker.start();
    //return
}

deferRender().then(() => {
    createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <App/>
        </React.StrictMode>,
        document.getElementById("root")

    );
});
/*const filePath = require('./use_mock.js');
USE_MOCK.then(() => {
	ReactDOM.render(
	  <React.StrictMode>
		<App />
	  </React.StrictMode>,
	  document.getElementById('root')
	);
  });
// Dynamically import app.js using the file path specified by use_mock.js
import(filePath).then((App) => {
  console.log('Starting the application...');
}).catch((error) => {
  console.error('Failed to import App:', error);
});
*/