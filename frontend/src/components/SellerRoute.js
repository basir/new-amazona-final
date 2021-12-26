import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../Store';

const SellerRoute = ({ children }) => {
  const { state } = useContext(Store);
  const { userInfo } = state;

  return userInfo && userInfo.isSeller ? children : <Navigate to="/signin" />;
};

export default SellerRoute;
