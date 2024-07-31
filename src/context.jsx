import { useContext, useReducer, useEffect, createContext } from "react";
import reducer from "./reducer";
import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from "./actions";
import { getTotals } from "./utils";

const url = "https://www.course-api.com/react-useReducer-cart-project";

const AppContext = createContext();

const initialState = {
  loading: false,
  cart: [],
  totalAmount: 0,
  totalPrice: 0,
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const remove = (id) => {
    dispatch({ type: REMOVE, payload: { id } });
  };

  const increase = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };

  const decrease = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };

  const fetchData = async () => {
    dispatch({ type: LOADING });
    try {
      const response = await fetch(url);
      const cart = await response.json();
      dispatch({ type: DISPLAY_ITEMS, payload: cart });
    } catch (error) {
      console.error("Error fetching data:", error);
      dispatch({ type: DISPLAY_ITEMS, payload: [] });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const { totalAmount, totalPrice } = getTotals(state.cart);
    dispatch({ type: "SET_TOTALS", payload: { totalAmount, totalPrice } });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
