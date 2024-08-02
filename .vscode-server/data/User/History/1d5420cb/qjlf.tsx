import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home }  from "./pages/Home.tsx";
import { Header } from "./components/Header.tsx";

function App() {
  return (
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;