import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";

export default function CartScreen(props) {
  const navigate = useNavigate();

  const rdxDispatch = useDispatch();
  const {
    cartItems,
    error: errorAddToCart,
    success: successAddToCart,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    if (errorAddToCart) {
      toast.error(errorAddToCart);
      rdxDispatch({
        type: "CART_ADD_RESET",
      });
    } else if (successAddToCart) {
      toast.success("Successfully added to cart");
      rdxDispatch({
        type: "CART_ADD_RESET",
      });
      navigate("/cart");
    }
  }, [errorAddToCart, successAddToCart, rdxDispatch, navigate]);

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };
  return (
    <div>
      <h1>Shopping Cart</h1>
      <div className="row">
        <div className="col-md-8">
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ul className="list-group list-group-flush">
              {cartItems.map((item) => (
                <li className="list-group-item" key={item.product}>
                  <div className="row align-items-center">
                    <div className="col-md-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{" "}
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </div>
                    <div className="col-md-3">
                      <button
                        onClick={() =>
                          rdxDispatch(
                            addToCart(item.product, Number(item.qty - 1))
                          )
                        }
                        disabled={item.qty === 1}
                        className="btn"
                      >
                        <i className="fas fa-minus-circle"></i>
                      </button>{" "}
                      <span>{item.qty}</span>{" "}
                      <button
                        disabled={item.qty === item.countInStock}
                        className="btn"
                        onClick={() =>
                          rdxDispatch(
                            addToCart(item.product, Number(item.qty + 1))
                          )
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
                        onClick={() =>
                          rdxDispatch(removeFromCart(item.product))
                        }
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
                  Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :
                  ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
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
      </div>
    </div>
  );
}
