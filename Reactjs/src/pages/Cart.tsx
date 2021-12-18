import { useContext, useEffect, useState } from "react";
import { useIsAuthContext } from "../context/IsAuth";
import "./Cart.css";
import { Toshiba } from "../images";
import Api from "../API";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext";

export default function Cart() {
  const [isUserCarts, setIsUserCarts] = useState<any>();
  const { cartItems, removeProductFromCart } = useAppContext();
  return <div className="cart__container">

    {
      cartItems?.map(cartItem => {
        return (
          <div key={cartItem.ID} className="cart__card__container">
            <div className="cart__card__img__container">
              <img src={`${cartItem.product.ImageFormat}, ${cartItem.product.Base64}`} alt="" />
            </div>
            <div>
              <span>Quantity: </span> <span>{cartItem.Quantity}</span>
            </div>
            <div>
              <div>
                <h5>title: {cartItem.product.name}</h5>
                <p>Price: {cartItem.Quantity * cartItem.product.price}</p>
                <p>Transportation: {cartItem.product.transport}</p>
                <p>Devlicery: {cartItem.product.packaging}</p>
                <p>VAT</p>
                <p>Total TTC</p>
              </div>
              <button type="button" onClick={() => {
                debugger
                if (removeProductFromCart !== undefined) {
                  removeProductFromCart(cartItem.ID)
                }
              }}>Remove from cart {cartItem.ID}</button>
            </div>
          </div>
        )
      })
    }
  </div>
}
