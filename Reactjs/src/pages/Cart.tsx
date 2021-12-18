import { useEffect, useState } from "react";
import { useIsAuthContext } from "../context/IsAuth";
import "./Cart.css"
import { Toshiba } from "../images";
import Api from "../API";
import { toast } from "react-toastify";

export default function Cart() {
  const [isUserCarts, setIsUserCarts] = useState<any>();
const fetchUserCart = () => {


  Api({method:"get",fetchApiUrl:"cart"}).then((res: any)=>{
    setIsUserCarts(res.data)
  }).catch((err: any)=>{
    err.reponse.data.message && toast(err.reponse.data.message) 
  }) 

}

  useEffect(()=>{
  },[])

  return <div className="cart__container">
    <div className="cart__card__container">
      <div className="cart__card__img__container">
        <img src={Toshiba} alt="" />
      </div>
      <div>
        <span>Quantity</span>
      </div>
      <div>
        <div>
          <h5>title</h5>
          <p>Price</p>
          <p>Transportation</p>
          <p>Devlicery</p>
          <p>VAT</p>
          <p>Total TTC</p>
        </div>
      </div>
    </div>
  </div>
}
