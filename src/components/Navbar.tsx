import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShoppingCart from "./ShoppingCart";
import ProductGrid from "./ProductGrid";

function Navbar() {
  return (
    <Router>
  <Routes>
    <Route path="/" element={<ProductGrid />} />
    <Route path="/cart" element={<ShoppingCart />} />
  </Routes>
</Router>
  )
}

export default Navbar