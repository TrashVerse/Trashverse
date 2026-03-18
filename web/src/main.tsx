import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root')!)

// Only use StrictMode in production to prevent development double-rendering issues
if (import.meta.env.PROD) {
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  )
} else {
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
