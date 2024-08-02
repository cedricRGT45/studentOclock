import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home }  from "./pages/Home.tsx";

function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;