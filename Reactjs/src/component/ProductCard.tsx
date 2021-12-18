import { useState } from "react";
import "./ProductCard.css";
import ProductInfo from "./ProductInfo";
import {ProductCardProps} from "../Models/DataModels/ProductCardModel"

function ProductCard({
  imageAlt,
  name,
  content,
  price,
  ImageFormat,
  Base64,
  packaging,
  serial_number,
  quantity,
  transport,
  ID,
}: ProductCardProps) {
  const [isProductPopupOn, setIsProductPopupOn] = useState<boolean>(false);

  return (
    <>
    
      {isProductPopupOn ? (
        <ProductInfo
          imageAlt={imageAlt}
          title={name}
          content={content}
          price={price}
          packaging={packaging}
          serial_number={serial_number}
          quantity={quantity}
          transport={transport}
          ImageFormat={ImageFormat}
          Base64={Base64}
          ID={ID}
          setIsProductPopupOn={setIsProductPopupOn}
        />
      ) : null}
      <div  onClick={() => {
          setIsProductPopupOn(true);
        }} className="wrapper__container__homepage__cards">
        <div className="homepage__container__homepage__content">
          <h3>{name}</h3>
        </div>
        <div className="homepage__container__cards__img__container">
          <img src={`${ImageFormat},${Base64}`} alt={imageAlt} />
          
        </div>
        <p className="homepage__container__cards__img__price">${price}</p>

      </div>
    </>
  );
}

export default ProductCard;
