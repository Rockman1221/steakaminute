import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FreshMeatHouseWebsite from "./FreshMeatHouseWebsite";
import Checkout from "./Checkout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<FreshMeatHouseWebsite />} />
        
        {/* Checkout Page */}
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
