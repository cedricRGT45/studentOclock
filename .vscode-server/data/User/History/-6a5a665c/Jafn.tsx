import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import 'App' from "./pages/App.tsx"
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import App from './pages/App.tsx'

const routes = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<App />} />,
        </>
    ),
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
)
