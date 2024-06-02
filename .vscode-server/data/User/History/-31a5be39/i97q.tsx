
import { RootState } from './store';
import './App.css'
import Parent from './components/Parent'

// redux
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { changeColor, toggle } from './store/features/theme/themeSlice';

function App() {
  console.log("% APP");

  // lire le state

  // ! Le sélecteur abonne le composant à la partie du state qu'il retourne
  // => la bonne pratique consiste à ne retourner qu'une valeur par sélecteur pour gérer de manière préciser les parties du state auxquelle son abonne le composant
  const isDark = useAppSelector((state: RootState) => state.theme.isDark)
  const color = useAppSelector((state: RootState) => state.theme.mainColor)

  return (
    <>
      <h1>APP</h1>

      { isDark && <h1>DARK !</h1> }

      { color }

      <Parent />
    </>
  )
}

export default App
