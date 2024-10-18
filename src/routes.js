import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./pages/Home";
import Rumah from "./pages/Rumah";
import RumahCreate from "./pages/Rumah/create"
import RumahDetail from "./pages/Rumah/[id]/detail";
import RumahEdit from "./pages/Rumah/[id]/edit"
import CatatanHistoricalRumah from "./pages/Rumah/[id]/catatan-historical"
import CekTagihanIuran from "./pages/Rumah/[id]/cek-tagihan"
import Penghuni from "./pages/Penghuni";
import Pembayaran from "./pages/Pembayaran";
import PembayaranCreate from "./pages/Pembayaran/create";

function RoutesConfig() {
  return (
    <Routes>
      {/* <Route path="/" exact element={<Home />} /> */}
      <Route path="/rumah" element={<Rumah />} />
      <Route path="/rumah/create" element={<RumahCreate />} />
      <Route path="/rumah/:id" element={<RumahDetail />} />
      <Route path="/rumah/:id/edit" element={<RumahEdit />} />
      <Route path="/rumah/:id/catatan-historical" element={<CatatanHistoricalRumah />} />
      <Route path="/rumah/:id/cek-tagihan" element={<CekTagihanIuran />} />
      <Route path="/penghuni" element={<Penghuni />} />
      <Route path="/pembayaran" element={<Pembayaran />} />
      <Route path="/pembayaran/create" element={<PembayaranCreate />} />
    </Routes>
  );
}

export default RoutesConfig;
