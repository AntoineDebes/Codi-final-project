import { useState, useContext, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import Api from "../API";
interface AppContextProps {
  appContext: any,

}
interface AddProductAPI {
  quantityOfProduct: number,
  ID: string
}
type ContextType = {
  cartItems: any[],
  cartStorage: 'local' | 'server',
  addProductToCart: (product: AddProductAPI) => void
  removeProductFromCart: (id: number) => void
  updateProductQuantityFromCart: (id: number, qunatity: number) => void
}
const defaultAppContextData = {
  cartItems: [],
  addProductToCart: () => { console.log('') },
  removeProductFromCart: () => { console.log('') },
  updateProductQuantityFromCart: () => { console.log('') },
}
const AppContext = createContext<Partial<ContextType>>(defaultAppContextData);

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }: any) {
  const [appContext, setAppContext] = useState<any>({
    cartItems: [],
    cartStorage: 'local'
  });
  const fetchUserCart = () => {
    Api({ method: "get", fetchApiUrl: "carts" }).then((res: any) => {
      console.log('res.data', res.data)
      setAppContext({
        ...appContext,
        cartItems: res.data.result
      })
    }).catch((err: any) => {
      console.log('res.data err', err);
      setAppContext({
        ...appContext,
        cartItems: []
      })
      // err.reponse.data.message && toast(err.reponse.data.message)
    })
  }

  useEffect(() => {
    fetchUserCart()
  }, [])

  const addProductToCart = ({ ID, quantityOfProduct }: AddProductAPI) => {
    console.log('Product added to cart')
    addProductToCartFetch({ ID, quantityOfProduct })
  }

  const addProductToCartFetch = (props: AddProductAPI) => {
    let params = {
      quantity: props.quantityOfProduct,
      product_ID: props.ID,
    };
    Api({ method: "post", fetchApiUrl: "carts", data: params }).then(_ => {
      fetchUserCart()
    });
  };

  const removeProductToCartFetch = (ID: number) => {
    debugger
    Api({ method: "delete", fetchApiUrl: "carts", data: { id: ID } }).then(_ => {
      debugger;
      fetchUserCart()
    });
  };

  const removeProductFromCart = (ID: number) => {
    debugger
    console.log('Context removing product', ID)
    removeProductToCartFetch(ID)
  }
  const updateProductQuantityFromCart = () => {
    console.log('Product quantity updated in cart')
  }

  return (
    <AppContext.Provider value={{ ...appContext, addProductToCart, removeProductFromCart, updateProductQuantityFromCart }}>
      {children}
    </AppContext.Provider>
  );
}
