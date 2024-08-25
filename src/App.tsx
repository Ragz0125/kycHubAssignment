import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SideBar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import ProductDetailsPage from "./modules/Product Details";
import CompareProductsPage from "./pages/compare-products";
import { MyProvider } from "./store";

function App() {
  return (
    <MyProvider>
      <Routes>
        <Route path="/" element={<ProductDetailsPage />} />
        <Route path="/compare-products/" element={<CompareProductsPage />} />
      </Routes>
    </MyProvider>
  );
}

export default App;
