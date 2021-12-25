import Axios from 'axios';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import { Store } from '../store';
import Row from 'react-bootstrap/Row';
export default function CartScreen(props) {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const updateCartHandler = async (item, quantity) => {
    const { data } = await Axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      return;
    }
    ctxDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping');
  };
  return (
    <div>
      <h1>Shopping Cart</h1>
      <Row>
        <div className="col-md-8">
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ul className="list-group list-group-flush">
              {cartItems.map((item) => (
                <li className="list-group-item" key={item._id}>
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div className="col-md-3">
                      <button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                        className="btn"
                      >
                        <i className="fas fa-minus-circle"></i>
                      </button>{' '}
                      <span>{item.quantity}</span>{' '}
                      <button
                        disabled={item.quantity === item.countInStock}
                        className="btn"
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                      >
                        <i className="fas fa-plus-circle"></i>
                      </button>
                    </div>
                    <div className="col-md-3">${item.price}</div>
                    <div className="col-md-2">
                      <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => removeItemHandler(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-md-4">
          <div className="card card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <h3>
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                  items) : $
                  {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </h3>
              </li>
              <li className="list-group-item">
                <div className="d-grid">
                  <button
                    type="button"
                    onClick={checkoutHandler}
                    className="btn btn-primary"
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Row>
    </div>
  );
}
