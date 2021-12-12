import { useEffect, useState } from "react";
import Api from "../API";
import HomepageCard from "../component/HomepageCard";
import "./ProductUpdateRemove.css";
import { HomepageCardProps } from "../Models/DataModels/HomepageCardProps";

function ProductUpdateRemove() {
  const [products, setProducts] = useState<any>();
  useEffect(() => {
    Api({ method: "GET", fetchApiUrl: "products" }).then((res: any) =>
      setProducts(res.data)
    );
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
            id,
          }: HomepageCardProps) => {
            return (
              <HomepageCard
                content={content}
                ImageFormat={ImageFormat}
                Base64={Base64}
                imageAlt={imageAlt}
                price={price}
                name={name}
                key={id}
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
            id,
          }: HomepageCardProps) => {
            return (
              <HomepageCard
                content={content}
                ImageFormat={ImageFormat}
                Base64={Base64}
                imageAlt={imageAlt}
                price={price}
                name={name}
                key={id}
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
            id,
          }: HomepageCardProps) => {
            return (
              <HomepageCard
                content={content}
                ImageFormat={ImageFormat}
                Base64={Base64}
                imageAlt={imageAlt}
                price={price}
                name={name}
                key={id}
              />
            );
          }
        )}
      </div>
    </>
  );
}

export default ProductUpdateRemove;
