import { useEffect, useState } from "react";
import NavBar from "../../components/Navbar";
import SideBar from "../../components/Sidebar";
import styles from "../Product Details/ProductDetails.module.scss";
import axios from "axios";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import ProductTable from "../../components/ProductTable";

const ProductDetailsPage = () => {
  
  return (
    <div className={styles.App}>
      <SideBar page="product" />
      <div className={styles.wrapper}>
        <NavBar />
        <div className={styles.heroContent}>
          <h1>
            Welcome back! Discover our latest products and find what you love.
          </h1>
          <ProductTable enableRowSelection={false}/>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
