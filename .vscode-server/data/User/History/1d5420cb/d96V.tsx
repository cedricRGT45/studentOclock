import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/style/main.scss";
import { Home } from "./pages/Home.tsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/a-propos" element={<Apropos />} />
        {/* path allows to display a page according to the id item */}
        <Route path="/logement/:id/:host" element={<AccomodationDetails />} />
        {/* path="*" allows to display a 404 error if the path does not match any set path */}
        <Route path="*" element={<Erreur />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;