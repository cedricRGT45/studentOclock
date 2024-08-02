import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home";
import { Header} from "./components/Header"
import { Login } from "./pages/Login";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={< Home />} />
          <route path="/connexion" element={< Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
