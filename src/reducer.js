import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case CLEAR_CART:
      return { ...state, cart: [] };
    case REMOVE:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    case INCREASE:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, amount: item.amount + 1 }
            : item
        ),
      };
    case DECREASE:
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, amount: item.amount - 1 }
              : item
          )
          .filter((item) => item.amount > 0),
      };
    case LOADING:
      return { ...state, loading: true };
    case DISPLAY_ITEMS:
      return { ...state, cart: action.payload, loading: false };
    case "SET_TOTALS":
      return {
        ...state,
        totalAmount: action.payload.totalAmount,
        totalPrice: action.payload.totalPrice,
      };
    default:
      throw new Error(`No matching action type: ${action.type}`);
  }
};

export default reducer;
