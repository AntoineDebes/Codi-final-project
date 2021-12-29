import { useEffect, useState } from "react";
import Api from "../API";
import HomepageCard from "../component/HomepageCard";
import "./ProductUpdateRemove.css";
import { HomepageCardProps } from "../Models/DataModels/HomepageCardProps";
import { toast } from "react-toastify";

function ProductUpdateRemove() {
  const [products, setProducts] = useState<any>();

  const fetchData = () => {
    Api({ method: "GET", fetchApiUrl: "products" }).then((res: any) =>
      setProducts(res.data)
    );
  };

  const deleteProduct = (id: string) => {
    Api({
      method: "delete",
      fetchApiUrl: "products",
      data: { productID: id },
    })
      .then((res: any) => {
        toast(res.data.message);
      })
      .catch((err) => {
        toast(err.response.data.message);
      });
    setTimeout(() => {
      fetchData();
    }, 500);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <main className="wrapper__addproduct">
        <div className="wrapper__addProduct__container">
          <h2 className="wrapper__addProduct__title">Hero Section</h2>
          <div className="wrapper__container__homepage__hot-sales__container">
            {products?.hero?.map((products: HomepageCardProps) => {
              return (
                <HomepageCard
                  key={products.ID}
                  deleteProduct={deleteProduct}
                  {...products}
                />
              );
            })}
          </div>
        </div>

        <div className="wrapper__addProduct__container">
          <h2 className="wrapper__addProduct__title">Sales Section</h2>
          <div className="wrapper__container__homepage__hot-sales__container">
            {products?.sales?.map((products: HomepageCardProps) => {
              return (
                <HomepageCard
                  key={products.ID}
                  deleteProduct={deleteProduct}
                  {...products}
                />
              );
            })}
          </div>
        </div>

        <div className="wrapper__addProduct__container">
          <h2 className="wrapper__addProduct__title">Normal Section</h2>
          <div className="wrapper__container__homepage__hot-sales__container">
            {products?.normal?.map((products: HomepageCardProps) => {
              return (
                <HomepageCard
                  key={products.ID}
                  deleteProduct={deleteProduct}
                  {...products}
                />
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}

export default ProductUpdateRemove;
