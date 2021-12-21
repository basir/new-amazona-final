import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';

export default function SellerScreen(props) {
  const params = useParams();
  const { id: sellerId } = params;

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(sellerId));
    dispatch(listProducts({ seller: sellerId }));
  }, [dispatch, sellerId]);
  return (
    <div className="row">
      <div className="col-md-3">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div className="card">
            <div className="card-body">
              <div>
                <img
                  className="img-small"
                  src={user.seller.logo}
                  alt={user.seller.name}
                ></img>

                <h1>{user.seller.name}</h1>
              </div>

              <div>
                <Rating
                  rating={user.seller.rating}
                  numReviews={user.seller.numReviews}
                ></Rating>
              </div>
              <div>
                <a href={`mailto:${user.email}`}>Contact Seller</a>
              </div>
              <div>{user.seller.description}</div>
            </div>
          </div>
        )}
      </div>
      <div className="col-md-9">
        {loadingProducts ? (
          <LoadingBox></LoadingBox>
        ) : errorProducts ? (
          <MessageBox variant="danger">{errorProducts}</MessageBox>
        ) : (
          <>
            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
            <div className="row">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="col-sm-6 col-md-4 col-lg-4 mb-3"
                >
                  <Product product={product}></Product>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
