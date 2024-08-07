import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/style/main.scss";
import { Home }  from "./pages/Home.tsx";
import { Header } from "./components/Header.tsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
    </BrowserRouter>
  );
}

export default App;