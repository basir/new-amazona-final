import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;

  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <div className="card-body">
        <h3 className="card-title">{product.name}</h3>
        <div className="card-text">
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
        </div>
        <div className="price">${product.price}</div>
        {product.seller && product.seller.seller && (
          <Link to={`/seller/${product.seller._id}`}>
            {product.seller.seller.name}
          </Link>
        )}
      </div>
    </div>
  );
}
