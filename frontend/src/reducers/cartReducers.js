import {
  CART_ADD_ITEM,
  CART_ADD_ITEM_FAIL,
  CART_EMPTY,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], success: false, error: "" },
  action
) => {
  switch (action.type) {
    case "CART_ADD_REQUEST":
      return { ...state, loading: true };
    case "CART_ADD_SUCCESS":
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          error: "",
          success: true,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          error: "",
          success: true,
          cartItems: [...state.cartItems, item],
        };
      }

    case "CART_ADD_FAIL":
      return { ...state, error: action.payload, success: false };
    case "CART_ADD_RESET":
      return { ...state, error: "", success: false };

    case CART_REMOVE_ITEM:
      return {
        ...state,
        error: "",
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };
    case CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };
    case CART_EMPTY:
      return { ...state, error: "", cartItems: [] };
    default:
      return state;
  }
};
