import { Table } from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../ProductTable/ProductTable.module.scss";
import { MyContext } from "../../store";


const ProductTable = (props: any) => {
  const [productsData, setProductData] = useState<any>();
  const { state, setState }: any = useContext(MyContext);
  const navigate = useNavigate();

  useEffect(() => {
    getProductsData();
  }, [state]);

  const handleChange = (data: any) => {
    if (
      props?.products.includes(data) ||
      JSON.stringify(data) === JSON.stringify(state.products)
    ) {
      props?.setDisclaimer("Product already added to comparison"); 
    } else if (props?.products.length < 4) {
      props?.setProducts((prevData: any) => [...prevData, data]);
      props?.setDisclaimer(""); 
    }
  };

  const getProductsData = async () => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        if (response?.data) {
          setProductData(response?.data?.products);
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  };

  const handleOnClick = (text: any) => {
    if (props?.enableRowSelection) {
      handleChange(text);
    } else {
      setState({ ...state, products: text });
      navigate(`/compare-products/`);
    }
  };

  const columns: any = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a: any, b: any) => a.title.localeCompare(b.title),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
      onFilter: (value: any, record: any) =>
        record.price.indexOf(value as string) === 0,
      sorter: (a: any, b: any) => a.price - b.price,
    },
    {
      title: "Discount Percentage",
      dataIndex: "discountPercentage",
      key: "discountPercentage",
      render: (text: any) => <div>{text} %</div>,
      sorter: (a: any, b: any) => a.discountPercentage - b.discountPercentage,
    },

    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },

    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a: any, b: any) => a?.category.localeCompare(b?.category),
    },
    {
      title: "Image",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text: any) => <img src={text} width={100} />,
    },
    {
      title: "Action",
      key: "id",
      render: (text: any) => (
        <div className={styles.button} onClick={() => handleOnClick(text)}>
          Compare
        </div>
      ),
    },
  ].filter(Boolean);
  return (
    <Table
      size={"small"}
      dataSource={productsData}
      columns={columns}
      showSorterTooltip={{ target: "sorter-icon" }}
      bordered
     
    />
  );
};

export default ProductTable;
