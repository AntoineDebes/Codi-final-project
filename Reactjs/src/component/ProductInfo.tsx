import { useState } from "react";
import "./ProductInfo.css";
import { useClickOutside } from "../context/ClickOutside";
import { useAppContext } from "../context/AppContext";

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
  const { addProductToCart } = useAppContext();

  const incrementQuantity = () => {
    return setQuantityOfProduct(quantityOfProduct + 1);
  };

  const decrementQuantity = () => {
    if (!!!quantityOfProduct) return;
    return setQuantityOfProduct(quantityOfProduct - 1);
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
            <div className="product-info__container__product__container__content">
              <h3 className="product-info__container__product__container__content__name">
                {title}
              </h3>
              <p>Description</p>
              <p>{content}</p>
              <p>Serial Number</p>
              <p>{serial_number}</p>
              <p>Price</p>
              <p>{price}</p>
              <p>Quantity</p>
              <p>{quantity}</p>
              <p>Transport</p>
              <p>{transport}</p>
              <p>Packaging</p>
              <p>{packaging}</p>
            </div>
            <div className="product-info__quantity-btn__container">
              <div>
                <p className="product-info__quantity__title">Quantity</p>
                <div className="product-info__container__product__quantity">
                  <p>{quantityOfProduct}</p>
                  <div className="product-info__container__product__quantity__arrows">
                    <span onClick={() => incrementQuantity()}>
                      <i className="fas fa-sort-up"></i>
                    </span>
                    <span onClick={() => decrementQuantity()}>
                      <i className="fas fa-sort-down"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="wrapper__signin__form__button"
                  disabled={quantityOfProduct === 0}
                  onClick={() => {
                    if (addProductToCart !== undefined) {
                      addProductToCart({
                        ID,
                        quantityOfProduct,
                      });
                      setIsProductPopupOn(false);
                    }
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductInfo;
