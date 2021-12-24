import "./Cart.css";
import { useAppContext } from "../context/AppContext";

export default function Cart() {
  const { cartItems, removeProductFromCart } = useAppContext();
  return (
    <div className="cart__container">
      {cartItems?.map(
        ({
          ID,
          Quantity,
          product: { ImageFormat, Base64, name, price, transport, packaging },
        }: any) => {
          let totalPriceHT = Quantity * price + +transport + +packaging;
          let vat = totalPriceHT * 0.11;

          return (
            <div key={ID} className="cart__card__container">
              <div className="cart__card__img__container">
                <img src={`${ImageFormat}, ${Base64}`} alt="" />
              </div>
              <div>
                <span>Quantity: </span>
                <span>{Quantity}</span>
              </div>
              <div>
                <div className="cart__card__content">
                  <h5>title:</h5>
                  <p>{name}</p>
                  <p>Price:</p>
                  <p>{Quantity * price}$</p>
                  <p>Transportation:</p>
                  <p>{transport}$</p>
                  <p>Devlicery:</p>
                  <p>{packaging}$</p>
                  <p>VAT</p>
                  <p>{vat}$</p>
                  <p>Total TTC</p>
                  <p>{totalPriceHT + vat}$</p>
                </div>
                <div className="button__cart__conatiner">
                  <button
                    type="button"
                    className="button__submit__signup"
                    onClick={() => {
                      if (removeProductFromCart !== undefined) {
                        removeProductFromCart(ID);
                      }
                    }}
                  >
                    Remove
                  </button>
                  <button disabled className="button__submit__signup">
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
}
