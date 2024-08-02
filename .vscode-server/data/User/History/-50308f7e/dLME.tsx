// Utils
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

// Function
import { usePostAPI } from '../../utils/APIData/usePostAPI'

// components
import Logo from '../../assets/logo.png'
import { ErrorItem } from '../../utils/errorItem/errorItem'

import './login.scss'

export function Login() {

    // If a user is already connected, redirect him 

    useEffect(() => {
        const token = localStorage.getItem('wizardToken')
        if (token) {
            navigate('/roles')
        }
    }, [])

    // ----

    const [values, setValues] = useState<{email: string, password: string}>({
        email: '',
        password: ''
    })

    const { data, error, postdata} = usePostAPI()
    const [errorItem, setErrorItem] = useState<string | null>(null)
    const navigate = useNavigate()

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        postdata('login', values)

        console.log(data, error)
    }

    useEffect(() => {
        if (!data) return

        if (data.message) {
            setErrorItem(data.message)
            return
        }

        localStorage.setItem('wizardToken', data.token)
        localStorage.setItem('wizard', JSON.stringify(data.wizard))

        navigate('/roles')

    }, [data])

    return (
        <>
            <div className="login_container">
                <div className="login_container_img">
                    <img src={Logo} alt="logo de l'application" />
                </div>
                <h1 className="login_container_title">Connexion</h1>
                <form method="post" className="login_container_form" onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder="Identifiant" 
                        onChange={handleChange}
                    />
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Mot de passe" 
                        onChange={handleChange}
                    />
                    <div className="d-flex justify-end">
                        <button type="submit">
                            Soumettre
                        </button>
                    </div>
                </form>
                <Link to={'/'}>Retour a l'accueil</Link>
                {errorItem && <ErrorItem message={errorItem} />}
            </div>
        </>
    )
}