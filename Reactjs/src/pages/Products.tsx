import { useEffect, useState } from "react";
import "./Products.css";
import ProductCard from "../component/ProductCard";

import Api from "../API";
import { toast } from "react-toastify";

interface ProductsModel {
  ID: string;
  content: string;
  name: string;
  packaging: string;
  price: string;
  serial_number: string;
  quantity: string;
  transport: string;
  ImageFormat: string;
  Base64: string;
}

function Products() {
  const [products, setProducts] = useState<any>();
  useEffect(() => {
    Api({ method: "get", fetchApiUrl: "products" })
      .then((res: any) => {
        console.log(res.data);

        setProducts(res.data);
      })
      .catch((err: any) => {
        toast(err.response.data.message);
      });
  }, []);
  return (
    <div className="wrapper__container">
      <div className="wrapper__container__header">
        <h1>Our products</h1>
      </div>
      <section className="wrapper__container__products">
        {products?.sales.map(
          ({
            ID,
            content,
            name,
            price,
            packaging,
            serial_number,
            quantity,
            transport,
            ImageFormat,
            Base64,
          }: ProductsModel) => {
            return (
              <ProductCard
                content={content}
                ImageFormat={ImageFormat}
                Base64={Base64}
                imageAlt="Image"
                name={name}
                price={price}
                key={ID}
                ID={ID}
                packaging={packaging}
                serial_number={serial_number}
                quantity={quantity}
                transport={transport}
              />
            );
          }
        )}
        {products?.normal.map(
          ({
            ID,
            content,
            name,
            price,
            packaging,
            serial_number,
            quantity,
            transport,
            ImageFormat,
            Base64,
          }: ProductsModel) => {
            return (
              <ProductCard
                content={content}
                ImageFormat={ImageFormat}
                Base64={Base64}
                imageAlt="Image"
                name={name}
                ID={ID}
                price={price}
                key={ID}
                packaging={packaging}
                serial_number={serial_number}
                quantity={quantity}
                transport={transport}
              />
            );
          }
        )}
      </section>
    </div>
  );
}

export default Products;
