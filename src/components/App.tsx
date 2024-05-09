import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Fat from "./Fat";
import Ash from "./Ash";
import Protein from "./Protein";
import Moisture from "./Moisture";
import TotalSolids from "./TotalSolids";
import VolatileSolids from "./VolatileSolids";
import Fibre from "./Fibre";
import Home from "./Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="fat" element={<Fat />} />
        <Route path="ash" element={<Ash />} />
        <Route path="protein" element={<Protein />} />
        <Route path="moisture" element={<Moisture />} />
        <Route path="fibre" element={<Fibre />} />
        <Route path="total-solids" element={<TotalSolids />} />
        <Route path="volatile-solids" element={<VolatileSolids />} />
        <Route path="*" element={<div></div>} />
      </Route>
    </Routes>
  );
}

export default App;
