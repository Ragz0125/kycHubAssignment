import React, { useState, useEffect, useContext } from "react";
import { Table, Button } from "antd";
import styles from "../Compare Products/CompareProducts.module.scss";
import SideBar from "../../components/Sidebar";
import NavBar from "../../components/Navbar";
import ModalTable from "../../components/ModalTable";
import { MyContext } from "../../store";
import { stat } from "fs";

interface featureProps{
  key:string
  feature: string
}

const features: featureProps[] = [
  { key: "1", feature: "Title" },
  { key: "4", feature: "Description" },
  { key: "5", feature: "Price" },
  { key: "6", feature: "Discount Percentage" },
  { key: "7", feature: "Brand" },
  { key: "8", feature: "Category" },
];

const CompareTable = () => {
  const { state, setState }: any = useContext(MyContext);

  const [products, setProducts] = useState<any>([]);
  const [displayedFeatures, setDisplayedFeatures] = useState(features);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    if (products.length === 4) {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
    }
    const updatedFeatures = features.map((feature: any) => {
      const featureValues: any = {};
      products.forEach((product: any) => {
        featureValues[product.title] =
          product[
            feature.feature === "Discount Percentage"
              ? "discountPercentage"
              : feature.feature.toLowerCase()
          ];
      });
      return { ...feature, ...featureValues };
    });
    setDisplayedFeatures(updatedFeatures);
  }, [products]);

  useEffect(() => {
    if (state.products !== null) {
      setProducts([state?.products]);
    }
  }, [state]);

  const handleRemoveProduct = (productName: any) => {
    setProducts(products.filter((product: any) => product.id !== productName));
  };

  const columns = [
    {
      title: "Feature",
      dataIndex: "feature",
      key: "feature",
      render:(text:string) => <div style={{fontWeight: "600"}}>{text}</div>
    },
    ...products.map((product: any) => ({
      title: (
        <>
          {product.title}
          <Button
            onClick={() => handleRemoveProduct(product.id)}
            type="link"
            style={{ marginLeft: 8 }}
          >
            Remove
          </Button>
        </>
      ),
      dataIndex: product.title,
      key: product.title,
    })),
  ];

  return (
    <>
      <div className={styles.App}>
        <SideBar page="compare" />
        <div className={styles.wrapper}>
          <NavBar />
          <div className={styles.heroContent}>
            <div className={styles.wrap}>
              <h1>
                Compare your selected products to see which one stands out!
              </h1>
              <div
                style={{
                  backgroundColor:
                    products?.length >= 4 ? "#BBBFC1" : "#007AFF",
                }}
                className={styles.button}
                onClick={() =>
                  products?.length === 4 ? null : setOpenModal(true)
                }
              >
                Add to Compare
              </div>
            </div>

            {showErrorMessage && (
              <div className={styles.errorMessage}>
                You can only compare up to 4 products at a time. Please remove
                some products to continue.
              </div>
            )}

            <Table
              dataSource={displayedFeatures}
              columns={columns}
              pagination={false}
              bordered
            />
          </div>
        </div>
      </div>
      <ModalTable
        isOpen={openModal}
        isClose={setOpenModal}
        setProducts={setProducts}
        products={products}
      />
    </>
  );
};

export default CompareTable;
