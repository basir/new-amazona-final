import Axios from 'axios';
import React, { useContext, useEffect, useReducer, useState } from 'react';
import Helmet from 'react-helmet';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_REQUEST':
      return { ...state, loadingUpdate: true };
    case 'UPDATE_SUCCESS':
      return { ...state, loadingUpdate: false };
    case 'UPDATE_FAIL':
      return { ...state, loadingUpdate: false };

    default:
      return state;
  }
};

export default function ProfileScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const [{ loading, error, loadingUpdate }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSeller, setIsSeller] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const { data } = await Axios.get(`/api/users/${userInfo._id}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setName(data.name);
        setEmail(data.email);
        if (data.seller) {
          setIsSeller(data.isSeller);
          setSellerName(data.seller.name);
          setSellerLogo(data.seller.logo);
          setSellerDescription(data.seller.description);
        }
        dispatch({ type: 'FETCH_SUCCESS' });
      } catch (error) {
        dispatch({
          type: 'FETCH_FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [dispatch, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: 'UPDATE_REQUEST' });
    try {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
      } else {
        const { data } = await Axios.put(
          '/api/users/profile',
          {
            name,
            email,
            password,
            sellerName,
            sellerLogo,
            sellerDescription,
          },
          {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({
          type: 'UPDATE_SUCCESS',
        });

        ctxDispatch({ type: 'USER_SIGNIN', payload: data });
        localStorage.setItem('userInfo', JSON.stringify(data));
        toast.success('User updated successfully');
      }
    } catch (error) {
      toast.error(getError(error));
      dispatch({ type: 'UPDATE_FAIL' });
    }
  };

  return (
    <div className="container small-container">
      <Helmet>
        <title>User Profile</title>
      </Helmet>
      <h1 className="my-3">User Profile</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              className="form-control"
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </div>

          {isSeller && (
            <>
              <h2>Seller</h2>

              <div className="mb-3">
                <label htmlFor="sellerName" className="form-label">
                  seller Name
                </label>
                <input
                  id="sellerName"
                  type="text"
                  placeholder="Enter sellerName"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  className="form-control"
                ></input>
              </div>

              <div className="mb-3">
                <label htmlFor="sellerLogo" className="form-label">
                  Seller Logo
                </label>
                <input
                  id="sellerLogo"
                  type="text"
                  placeholder="Enter sellerLogo"
                  value={sellerLogo}
                  onChange={(e) => setSellerLogo(e.target.value)}
                  className="form-control"
                ></input>
              </div>

              <div className="mb-3">
                <label htmlFor="sellerDescription" className="form-label">
                  seller Description
                </label>
                <input
                  id="sellerDescription"
                  type="text"
                  placeholder="Enter sellerDescription"
                  value={sellerDescription}
                  onChange={(e) => setSellerLogo(e.target.value)}
                  className="form-control"
                ></input>
              </div>
            </>
          )}
          <div className="mb-3">
            <label />
            <button
              className="btn btn-primary"
              type="submit"
              disabled={loadingUpdate}
            >
              Update
            </button>
          </div>
          {loadingUpdate && <LoadingBox></LoadingBox>}
        </form>
      )}
    </div>
  );
}
