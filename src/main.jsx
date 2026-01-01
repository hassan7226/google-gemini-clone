/* src/main.jsx */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ContextProvider from './context/Context.jsx' // 1. Import your provider

ReactDOM.createRoot(document.getElementById('root')).render(
  // 2. Wrap the App component here
  <ContextProvider> 
    <App />
  </ContextProvider>,
)


