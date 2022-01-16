import Home from "./Home/index";
import QRCode from "./QRCode/index";
import Barcode from "./Barcode/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qrcode" element={<QRCode />} />
        <Route path="/barcode" element={<Barcode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
