import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/main.scss";
import { Home }  from "./pages/Home.tsx";
import { Header } from "./components/Header.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;