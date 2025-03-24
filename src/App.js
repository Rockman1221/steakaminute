import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SteakaminuteWebsite from "./steakaminuteWebsite";
import Checkout from "./Checkout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<SteakaminuteWebsite />} />
        
        {/* Checkout Page */}
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
