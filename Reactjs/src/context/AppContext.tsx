import { useState, useContext, createContext, useEffect } from "react";
import Api from "../API";

interface AddProductAPI {
  quantityOfProduct: number;
  ID: string;
}

interface appContextProps {
  cartItems: any[];
  productItems: {
    sales: any[];
    normal: any[];
    hero: any[];
  };
  cartStorage: "local" | "server";
}

interface ContextType extends appContextProps {
  addProductToCart: (product: AddProductAPI) => void;
  removeProductFromCart: (id: number) => void;
  updateProductQuantityFromCart: (id: number, qunatity: number) => void;
}

const defaultAppContextData = {
  cartItems: [],
  productItems: {
    sales: [],
    normal: [],
    hero: [],
  },
  addProductToCart: () => {
    console.log("");
  },
  removeProductFromCart: () => {
    console.log("");
  },
  updateProductQuantityFromCart: () => {
    console.log("");
  },
};
const AppContext = createContext<Partial<ContextType>>(defaultAppContextData);

export function useAppContext() {
  return useContext(AppContext);
}

export function AppContextProvider({ children }: any) {
  const [appContext, setAppContext] = useState<appContextProps>({
    cartItems: [],
    cartStorage: "local",
    productItems: {
      sales: [],
      normal: [],
      hero: [],
    },
  });

  const fetchProdcuts = () => {
    Api({ method: "get", fetchApiUrl: "products" })
      .then((res: any) => {
        setAppContext((data: appContextProps) => ({
          ...data,
          productItems: res.data,
        }));
      })
      .catch((err: any) => {
        console.log("error", err);
        setAppContext((data: appContextProps) => ({
          ...data,
          productItems: { sales: [], normal: [], hero: [] },
        }));
      });
  };

  const fetchUserCart = () => {
    Api({ method: "get", fetchApiUrl: "carts" })
      .then((res: any) => {
        setAppContext((data: appContextProps) => ({
          ...data,
          cartItems: res.data.result,
        }));
      })
      .catch((_) => {
        setAppContext((data: appContextProps) => ({ ...data, cartItems: [] }));
      });
  };

  useEffect(() => {
    fetchProdcuts();
    fetchUserCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProductToCart = ({ ID, quantityOfProduct }: AddProductAPI) => {
    addProductToCartFetch({ ID, quantityOfProduct });
  };

  const addProductToCartFetch = ({ quantityOfProduct, ID }: AddProductAPI) => {
    let params = {
      quantity: quantityOfProduct,
      product_ID: ID,
    };
    Api({ method: "post", fetchApiUrl: "carts", data: params }).then((_) => {
      fetchUserCart();
    });
  };

  const removeProductToCartFetch = (ID: number) => {
    Api({ method: "delete", fetchApiUrl: "carts", data: { id: ID } }).then(
      (_) => {
        fetchUserCart();
      }
    );
  };

  const removeProductFromCart = (ID: number) => {
    removeProductToCartFetch(ID);
  };

  const updateProductQuantityFromCart = () => {
    console.log("Product quantity updated in cart");
  };

  return (
    <AppContext.Provider
      value={{
        ...appContext,
        addProductToCart,
        removeProductFromCart,
        updateProductQuantityFromCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
