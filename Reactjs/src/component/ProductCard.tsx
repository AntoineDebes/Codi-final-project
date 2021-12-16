import { useState } from "react";
import "./ProductCard.css";
import ProductInfo from "./ProductInfo";

interface ProductCardProps {
  imageAlt: string;
  title: string;
  content: string;
  price: string;
  packaging: string;
  serial_number: string;
  quantity: string;
  transport: string;
  ImageFormat: string;
  Base64: string;
}

function ProductCard({
  imageAlt,
  title,
  content,
  price,
  ImageFormat,
  Base64,
  packaging,
  serial_number,
  quantity,
  transport,
}: ProductCardProps) {
  const [isProductPopupOn, setIsProductPopupOn] = useState<boolean>(false);

  return (
    <>
      {isProductPopupOn ? (
        <ProductInfo
          imageAlt={imageAlt}
          title={title}
          content={content}
          price={price}
          packaging={packaging}
          serial_number={serial_number}
          quantity={quantity}
          transport={transport}
          ImageFormat={ImageFormat}
          Base64={Base64}
          setIsProductPopupOn={setIsProductPopupOn}
        />
      ) : null}
      <div
        onClick={() => {
          setIsProductPopupOn(true);
        }}
        className="wrapper__container__products__cards"
      >
        <div className="products__container__cards__img__container">
          <img src={`${ImageFormat},${Base64}`} alt={imageAlt} />
          <p>{price}</p>
        </div>
        <div className="products__container__cards__content">
          <h4>{title}</h4>
          <p>{content}</p>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
