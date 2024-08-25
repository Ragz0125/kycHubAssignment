import { useContext, useEffect, useState } from "react";
import styles from "../ModalTable/ModalTable.module.scss";
import ProductTable from "../ProductTable";
import { MyContext } from "../../store";

interface ModalTableProps{
  isOpen?: boolean
  isClose?: any
  setProducts?: Function
  products?:any
}
const ModalTable = ({ isOpen, isClose, setProducts, products }: ModalTableProps) => {
  const [disclaimer, setDisclaimer] = useState<string>();
  const {state, setState}:any  = useContext(MyContext)

  useEffect(() => {
    if (products.length === 0) {
      setDisclaimer("");
      // setState({...state, products:null})
    }
  }, [products]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>Select the Products to Compare</h3>
        <div className={styles.row}>
          {" "}
          {products.length} selected
          <div
          className={styles.button}
            onClick={() => {
              isClose(false);
            }}
          >
            Compare Now
          </div>
        </div>
        {products.length >= 4 && (
          <div className={styles.error}>
            {" "}
            Only 4 products can be compared at a time
          </div>
        )}

        {disclaimer !== "" && <div className={styles.disclaimer}>{disclaimer?.toUpperCase()}</div>}
        <div className={styles.tableContent}>
          <ProductTable
            enableRowSelection={true}
            products={products}
            setProducts={setProducts}
            setDisclaimer={setDisclaimer}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalTable;
