import Axios from 'axios';
import React, { useContext, useReducer } from 'react';
import Row from 'react-bootstrap/Row';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CheckoutSteps from '../components/CheckoutSteps';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../store';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH_PRODUCT':
      return { ...state, product: action.payload };
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_REQUEST':
      return { ...state, loadingCreateReview: true };
    case 'CREATE_SUCCESS':
      return { ...state, loadingCreateReview: false };
    case 'CREATE_FAIL':
      return { ...state, loadingCreateReview: false };
    default:
      return state;
  }
};

export default function PlaceOrderScreen(props) {
  const navigate = useNavigate();

  const [{ loading, error }, dispatch] = useReducer(reducer, {
    loading: false,
    error: '',
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  if (!cart.paymentMethod) {
    navigate('/payment');
  }
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
  cart.taxPrice = round2(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE_REQUEST' });
      const { data } = await Axios.post(
        '/api/orders',
        {
          orderItems: cart.cartItems,
          shippingAddress: cart.shippingAddress,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          shippingPrice: cart.shippingPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      ctxDispatch({ type: 'CART_CLEAR' });
      dispatch({ type: 'CREATE_SUCCESS' });
      localStorage.removeItem('cartItems');
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE_FAIL' });
      toast.error(getError(err));
    }
  };

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <h1 className="my-3">Preview Order</h1>
      <Row>
        <div className="col-md-8">
          <div className="mb-3 card card-body">
            <h2>Shipping</h2>
            <p>
              <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
              <strong>Address: </strong> {cart.shippingAddress.address},
              {cart.shippingAddress.city}, {cart.shippingAddress.postalCode},
              {cart.shippingAddress.country}
            </p>
            <Link to="/shipping">Edit</Link>
          </div>

          <div className="mb-3 card card-body">
            <h2>Payment</h2>
            <p>
              <strong>Method:</strong> {cart.paymentMethod}
            </p>
            <Link to="/payment">Edit</Link>
          </div>

          <div className="mb-3 card card-body">
            <h2>Items</h2>
            <ul className="list-group list-group-flush">
              {cart.cartItems.map((item) => (
                <li className="list-group-item" key={item._id}>
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div className="col-md-3">
                      <span>{item.quantity}</span>
                    </div>
                    <div className="col-md-3">${item.price}</div>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/cart">Edit</Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card card-body">
            <h2>Order Summary</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <Row>
                  <div className="col">Items</div>
                  <div className="col">${cart.itemsPrice.toFixed(2)}</div>
                </Row>
              </li>
              <li className="list-group-item">
                <Row>
                  <div className="col">Shipping</div>
                  <div className="col">${cart.shippingPrice.toFixed(2)}</div>
                </Row>
              </li>
              <li className="list-group-item">
                <Row>
                  <div className="col">Tax</div>
                  <div className="col">${cart.taxPrice.toFixed(2)}</div>
                </Row>
              </li>
              <li className="list-group-item">
                <Row>
                  <div className="col">
                    <strong> Order Total</strong>
                  </div>
                  <div className="col">
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </Row>
              </li>

              <li className="list-group-item">
                <div className="d-grid">
                  <button
                    type="button"
                    onClick={placeOrderHandler}
                    className="btn btn-primary"
                    disabled={cart.cartItems.length === 0}
                  >
                    Place Order
                  </button>
                </div>

                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
              </li>
            </ul>
          </div>
        </div>
      </Row>
    </div>
  );
}
