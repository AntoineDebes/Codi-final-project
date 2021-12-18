import  { useState } from "react";
import "./ProductInfo.css";

import { useClickOutside } from "../context/ClickOutside";
import Api from "../API";

interface ProductInfoProps {
  imageAlt: string;
  title: string;
  content: string;
  price: string;
  packaging: string;
  serial_number: string;
  quantity: string;
  Base64: string;
  ImageFormat: string;
  transport: string;
  setIsProductPopupOn: Function;
  ID: string;
}

function ProductInfo({
  imageAlt,
  title,
  content,
  price,
  packaging,
  serial_number,
  quantity,
  Base64,
  ImageFormat,
  transport,
  setIsProductPopupOn,
  ID,
}: ProductInfoProps) {
  const [quantityOfProduct, setQuantityOfProduct] = useState<number>(0);

  const incrementQuantity = () => {
    return setQuantityOfProduct(quantityOfProduct + 1);
  };

  const decrementQuantity = () => {
    if (!!!quantityOfProduct) return;
    return setQuantityOfProduct(quantityOfProduct - 1);
  };

  const addProductToCart = () => {
    let params = {
      quantity: quantityOfProduct,
      product_ID: ID,
    };
    Api({ method: "post", fetchApiUrl: "carts", data: "" });
  };

  const domNode = useClickOutside(() => {
    setIsProductPopupOn(false);
  });
  return (
    <>
      <div className="product-info__container">
        <div className="product-info__container__product" ref={domNode}>
          <div
            className="wrapper__form__go-exit__btn"
            onClick={() => setIsProductPopupOn(false)}
          >
            <i className="fas fa-times" />
          </div>
          <div className="product-info__img__container">
            <img src={`${ImageFormat},${Base64}`} alt="Product pic" />
          </div>
          <div className="product-info__container__product__container">
            <div className="product-info__container__product__container__title">
              <h4>{title}</h4>
              <p>{content}</p>
            </div>
            <div className="product-info__container__product__container__content">
              <p>{serial_number}</p>
              <p>{price}</p>
              <p>{quantity}</p>
              <p>{transport}</p>
              <p>{packaging}</p>
            </div>
            <div>
              <div className="product-info__container__product__quantity">
              <p>{quantityOfProduct}</p>
              <div className="product-info__container__product__quantity__arrows">
              <span onClick={() => incrementQuantity()}><i className="fas fa-sort-up"></i></span>
              <span onClick={() => decrementQuantity()}><i className="fas fa-sort-down"></i></span>
              </div>
              </div>
            </div>
            <div>
              <button type="button" onClick={addProductToCart} className="add-product__form__button">
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductInfo;
