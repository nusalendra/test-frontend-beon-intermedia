import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
import Rumah from "./pages/Rumah";
import RumahCreate from "./pages/Rumah/create"
import Penghuni from "./pages/Penghuni";
import Pembayaran from "./pages/Pembayaran";

function RoutesConfig() {
  return (
    <Routes>
      {/* <Route path="/" exact element={<Home />} /> */}
      <Route path="/rumah" element={<Rumah />} />
      <Route path="/rumah/create" element={<RumahCreate />} />
      <Route path="/penghuni" element={<Penghuni />} />
      <Route path="/pembayaran" element={<Pembayaran />} />
    </Routes>
  );
}

export default RoutesConfig;
