import { useEffect, useState } from "react";
import Api from "../API";
import HomepageCard from "../component/HomepageCard";
import "./ProductUpdateRemove.css";
import { HomepageCardProps } from "../Models/DataModels/HomepageCardProps";
import { toast } from "react-toastify";
import { TIMEOUT } from "dns";

function ProductUpdateRemove() {
  const [products, setProducts] = useState<any>();

  const fetchData = () => {
    Api({ method: "GET", fetchApiUrl: "products" }).then((res: any) =>
      setProducts(res.data)
    );
  };

  const deleteProduct = (id: string) => {
    console.log({ id });

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
      <div>
        <h2>Hero Section</h2>
      </div>
      <div className="wrapper__container__homepage__hot-sales__container">
        {products?.hero?.map(
          ({
            name,
            price,
            content,
            ImageFormat,
            Base64,
            imageAlt,
            ID,
          }: HomepageCardProps) => {
            return (
              <HomepageCard
                content={content}
                ImageFormat={ImageFormat}
                Base64={Base64}
                imageAlt={imageAlt}
                price={price}
                name={name}
                ID={ID}
                deleteProduct={deleteProduct}
                key={ID}
              />
            );
          }
        )}
      </div>
      <div>
        <h2>Sales Section</h2>
      </div>
      <div className="wrapper__container__homepage__hot-sales__container">
        {products?.sales?.map(
          ({
            name,
            price,
            content,
            ImageFormat,
            Base64,
            imageAlt,
            ID,
          }: HomepageCardProps) => {
            return (
              <HomepageCard
                content={content}
                ImageFormat={ImageFormat}
                Base64={Base64}
                imageAlt={imageAlt}
                price={price}
                name={name}
                key={ID}
                ID={ID}
                deleteProduct={(e: string) => deleteProduct(e)}
              />
            );
          }
        )}
      </div>
      <div>
        <h2>Normal Section</h2>
      </div>
      <div className="wrapper__container__homepage__hot-sales__container">
        {products?.normal?.map(
          ({
            name,
            price,
            content,
            ImageFormat,
            Base64,
            imageAlt,
            ID,
          }: HomepageCardProps) => {
            return (
              <HomepageCard
                content={content}
                ImageFormat={ImageFormat}
                Base64={Base64}
                imageAlt={imageAlt}
                price={price}
                ID={ID}
                name={name}
                key={ID}
                deleteProduct={(e: string) => deleteProduct(e)}
              />
            );
          }
        )}
      </div>
    </>
  );
}

export default ProductUpdateRemove;
