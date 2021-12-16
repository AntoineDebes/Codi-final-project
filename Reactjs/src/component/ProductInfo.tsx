import React from "react";
import "./ProductInfo.css";

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
}: ProductInfoProps) {
  return (
    <>
      <div className="product-info__container">
        <div className="product-info__container__product">
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
              <p>{transport}</p>
              <p>{packaging}</p>
            </div>
            <div>{quantity}</div>
            <div>
              <button type="button"> Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductInfo;
