import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function PlaceOrderScreen(props) {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  if (!cart.paymentMethod) {
    navigate("/payment");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10);
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const dispatch = useDispatch();
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, navigate, success]);
  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <h1 className="my-3">Preview Order</h1>
      <div className="row">
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
                <li className="list-group-item" key={item.product}>
                  <div className="row align-items-center">
                    <div className="col-md-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{" "}
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div className="col-md-3">
                      <span>{item.qty}</span>
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
                <div className="row">
                  <div className="col">Items</div>
                  <div className="col">${cart.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Shipping</div>
                  <div className="col">${cart.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">Tax</div>
                  <div className="col">${cart.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col">
                    <strong> Order Total</strong>
                  </div>
                  <div className="col">
                    <strong>${cart.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
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
      </div>
    </div>
  );
}
