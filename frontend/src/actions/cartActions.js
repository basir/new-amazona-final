import Axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_ADD_ITEM_FAIL,
} from '../constants/cartConstants';

export const addToCart =
  (productId, quantity) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'CART_ADD_REQUEST',
        payload: `Out of stock`,
      });
      const { data } = await Axios.get(`/api/products/${productId}`);
      const {
        cart: { cartItems },
      } = getState();
      if (data.countInStock <= 0) {
        dispatch({
          type: 'CART_ADD_FAIL',
          payload: 'Out of stock',
        });
      } else if (
        cartItems.length > 0 &&
        data.seller._id !== cartItems[0].seller._id
      ) {
        dispatch({
          type: 'CART_ADD_FAIL',
          payload: `Can't Add To Cart. Buy only from ${cartItems[0].seller.seller.name} in this order`,
        });
      } else {
        dispatch({
          type: 'CART_ADD_SUCCESS',
          payload: {
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            seller: data.seller,
            quantity,
          },
        });
        localStorage.setItem(
          'cartItems',
          JSON.stringify(getState().cart.cartItems)
        );
      }
    } catch (err) {
      dispatch({
        type: 'CART_ADD_FAIL',
        payload: "Can't Fetch Product",
      });
    }
  };

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
  localStorage.setItem('paymentMethod', data);
};
