import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'

import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'
import App from './pages/App.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
)
