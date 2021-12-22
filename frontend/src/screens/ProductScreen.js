import Axios from 'axios';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addToCart } from '../actions/cartActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
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

export default function ProductScreen(props) {
  let reviewsRef = useRef();

  const [{ loading, error, product, loadingCreateReview }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: '',
    });

  const navigate = useNavigate();

  const params = useParams();
  const { id: productId } = params;

  const rdxDispatch = useDispatch();
  const { error: errorAddToCart, success: successAddToCart } = useSelector(
    (state) => state.cart
  );
  const { userInfo } = useSelector((state) => state.userSignin);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await Axios.get(`/api/products/${productId}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };

    fetchProduct();
  }, [dispatch, productId]);

  useEffect(() => {
    if (errorAddToCart) {
      toast.error(errorAddToCart);
      rdxDispatch({
        type: 'CART_ADD_RESET',
      });
    } else if (successAddToCart) {
      toast.success('Successfully added to cart');
      rdxDispatch({
        type: 'CART_ADD_RESET',
      });
      navigate('/cart');
    }
  }, [errorAddToCart, successAddToCart, rdxDispatch, navigate]);

  const addToCartHandler = async () => {
    rdxDispatch(addToCart(productId, 1));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!comment || !rating) {
      toast.error('Please enter comment and rating');
      return;
    }
    dispatch({ type: 'CREATE_REQUEST' });
    try {
      const { data } = await Axios.post(
        `/api/products/${productId}/reviews`,
        { rating, comment, name: userInfo.name },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: 'CREATE_SUCCESS',
      });
      toast.success('Review submitted successfully');
      product.reviews.unshift(data.review);
      product.numReviews = data.numReviews;
      product.rating = data.rating;
      dispatch({ type: 'REFRESH_PRODUCT', payload: product });
      window.scrollTo({
        behavior: 'smooth',
        top: reviewsRef.current.offsetTop,
      });
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'CREATE_FAIL' });
    }
  };
  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <div className="row">
        <div className="col-md-6">
          <img
            className="img-large"
            src={product.image}
            alt={product.name}
          ></img>
        </div>
        <div className="col-md-3">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <h1>{product.name}</h1>
            </li>
            <li className="list-group-item">
              <Rating
                rating={product.rating}
                numReviews={product.numReviews}
              ></Rating>
            </li>
            <li className="list-group-item">Pirce : ${product.price}</li>
            <li className="list-group-item">
              Description:
              <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div className="col-md-3">
          <div className="card">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                Seller{' '}
                <h2>
                  <Link to={`/seller/${product.seller._id}`}>
                    {product.seller.seller.name}
                  </Link>
                </h2>
                <Rating
                  rating={product.seller.seller.rating}
                  numReviews={product.seller.seller.numReviews}
                ></Rating>
              </li>
              <li className="list-group-item">
                <div className="d-flex">
                  <div className="me-auto">Price: </div>
                  <div className="price"> ${product.price}</div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="d-flex">
                  <div className="me-auto">Status: </div>
                  <div>
                    {product.countInStock > 0 ? (
                      <span className="success">In Stock</span>
                    ) : (
                      <span className="danger">Unavailable</span>
                    )}
                  </div>
                </div>
              </li>
              {product.countInStock > 0 && (
                <li className="list-group-item">
                  <div className="d-grid">
                    <button
                      onClick={addToCartHandler}
                      className="btn btn-primary"
                    >
                      Add to Cart
                    </button>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div>
        <h2 ref={reviewsRef}>Reviews</h2>

        <div className="mb-3">
          {product.reviews.length === 0 && (
            <MessageBox>There is no review</MessageBox>
          )}
        </div>
        <ul className="list-group list-group-flush">
          {product.reviews.map((review) => (
            <li className="list-group-item" key={review._id}>
              <strong>{review.name}</strong>
              <Rating rating={review.rating} caption=" "></Rating>
              <p>{review.createdAt.substring(0, 10)}</p>
              <p>{review.comment}</p>
            </li>
          ))}
        </ul>
        <div className="mb-3">
          {userInfo ? (
            <form onSubmit={submitHandler}>
              <h2>Write a customer review</h2>

              <div className="mb-3">
                <label htmlFor="rating" className="form-label">
                  Rating
                </label>
                <select
                  id="rating"
                  className="form-control"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value="">Select...</option>
                  <option value="1">1- Poor</option>
                  <option value="2">2- Fair</option>
                  <option value="3">3- Good</option>
                  <option value="4">4- Very good</option>
                  <option value="5">5- Excelent</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="comment" className="form-label">
                  Comment
                </label>
                <textarea
                  id="comment"
                  className="form-control"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <div className="mb-3">
                <button
                  disabled={loadingCreateReview}
                  type="submit"
                  className="btn btn-primary"
                >
                  Submit
                </button>

                {loadingCreateReview && <LoadingBox></LoadingBox>}
              </div>
            </form>
          ) : (
            <MessageBox>
              Please <Link to="/signin">Sign In</Link> to write a review
            </MessageBox>
          )}
        </div>
      </div>
    </div>
  );
}
