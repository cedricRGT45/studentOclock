import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'

// components
import { Home } from "./home/home.tsx";
import { Login } from './login/login.tsx';
import { Role } from './role/Role.tsx';
import { Header } from '../header/header';
import { Account } from './account/Account.tsx';

// styles
import './app.scss'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function App() {

    const routes = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<Home header={<Header />} />} />,
                <Route path="/login" element={<Login />} />,
                <Route path="/roles" element={<VerifyAuth><Role /></VerifyAuth>} />,
                <Route path="/compte" element={<VerifyAuth><Account header={<Header />} /></VerifyAuth>} />,
                <Route path="*" element={<p>404</p>} />,
            </> 
        ),
    )

  return (
    <>
        <RouterProvider router={routes} />
    </>
  )
}

function VerifyAuth({children}: any) {

    const navigate = useNavigate();

    try {
        const token = localStorage.getItem('wizardToken')
        if (!token) {
            useEffect(() => {
                navigate('/login')     
            }, []) 
        } else {
            return children
        }
    }
    catch(e) {
        useEffect(() => {
            navigate('/login')     
        }, [])

    }

    return null
}