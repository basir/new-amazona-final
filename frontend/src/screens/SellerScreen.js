import Axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        products: action.payload.products,
        loading: false,
      };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function SellerScreen() {
  const [{ loading, error, products, user }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const params = useParams();
  const { id: sellerId } = params;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data: user } = await Axios.get(
          `/api/users/sellers/${sellerId}`
        );
        const { data: products } = await Axios.get(
          `/api/products/sellers/${sellerId}`
        );
        dispatch({ type: 'FETCH_SUCCESS', payload: { user, products } });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [dispatch, sellerId]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <Row>
      <Col md={3}>
        <Card>
          <Card.Body>
            <img
              className="img-small"
              src={user.seller.logo}
              alt={user.seller.name}
            ></img>
            <Card.Title>
              {' '}
              <h1>{user.seller.name}</h1>
            </Card.Title>
            <Rating
              rating={user.seller.rating}
              numReviews={user.seller.numReviews}
            ></Rating>
            <div>
              <a href={`mailto:${user.email}`}>Contact Seller</a>
            </div>
            <div>{user.seller.description}</div>
          </Card.Body>
        </Card>
      </Col>
      <Col md={9}>
        {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
        <Row>
          {products.map((product) => (
            <Col sm={6} lg={4} className="mb-3" key={product._id}>
              <Product product={product}></Product>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}
