import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home";
import { Header} from "./components/Header"
import "../assets/sass/components/header.scss"
function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
