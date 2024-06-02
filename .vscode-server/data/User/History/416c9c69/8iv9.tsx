import React from 'react'
import App from './App.tsx'
import "./assets/scss/main.scss";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


// // import React from 'react'
// // import ReactDOM from 'react-dom/client'
// // import App from './App.tsx'
// // import './index.css'

// {/* on va mettre en place le routage de notre App avec React router 
      
//       "https://v5.reactrouter.com/web/guides/quick-start"
      
//       Un routage classique c'est :

//         - une url = une page html 

//         à chaque changement d'url, le navigateur envoie une requete au serveur pour obtenir la page html correspondante => rechargement de la page web

//       En react, on fait des SPA (Single Page Application) donc 1 seule page HTML dans laquelle on va venir modifier le contenu
//       Le routage en React c'est donc :

//         - 1 url = 1 nouveau contenu (composant) dans la meme page HTML

//         DOnc pas besoin d'envoyer des requetes ou de recharger la page web
//         Mais du coup on se retrouve embêté par le comportement de base des liens d'ancre HTML, on ne peut pas les utiliser pour notre navigation

//         => La solution => React Router 

//           il va simuler un comportement de routage "classique" (changement d'url dans le navigateur et changement de contenu), tout en reespectant le principe d'une SPA (pas de changement de page)
      
      
//       */}

// import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
// import HomePage from './page/HomePage.tsx'

// const Error = () => {
//   return (
//     <h1>
//       ERROR
//     </h1>
//   )
// }


// // const router = createBrowserRouter(
// //   createRoutesFromElements(
// //     <>


// //       <Route path='/' element={ <HomePage /> } />







// //       <Route element={ <Error /> } />

// //     </>
// //   )
// // )

// // ReactDOM.createRoot(document.getElementById('root')!).render(
// //   <React.StrictMode>
// //     <RouterProvider router={router} />
// //   </React.StrictMode>,
// // )
