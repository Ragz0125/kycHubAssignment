
import "./App.css";
import { Routes, Route } from "react-router-dom";
import ProductDetailsPage from "./modules/Product Details";
import CompareProductsPage from "./pages/compare-products";
import { MyProvider } from "./store";

function App() {
  return (
    <MyProvider>
      <Routes>
        <Route path="/" element={<ProductDetailsPage />} />
        <Route path="/compare-products" element={<CompareProductsPage />} />
      </Routes>
    </MyProvider>
  );
}

export default App;
