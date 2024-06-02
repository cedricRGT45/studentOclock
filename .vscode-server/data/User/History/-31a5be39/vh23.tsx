import './App.css'
import Parent from './components/Parent'
import { useAppSelector } from './hooks/redux';


function App() {
  console.log("% APP");
  const themeValue = useAppSelector();
  return (
    <>
      <h1>APP</h1>
      <Parent />
    </>
  )
}

export default App
