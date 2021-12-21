import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [sellerName, setSellerName] = useState('');
  const [sellerLogo, setSellerLogo] = useState('');
  const [sellerDescription, setSellerDescription] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorUpdate) {
      toast.error(errorUpdate);
      dispatch({
        type: 'USER_UPDATE_PROFILE_RESET',
      });
    } else if (successUpdate) {
      toast.success('Profile Updated Successfully');
      dispatch({
        type: 'USER_UPDATE_PROFILE_RESET',
      });
    }
  }, [dispatch, successUpdate, errorUpdate]);

  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setEmail(user.email);
      if (user.seller) {
        setSellerName(user.seller.name);
        setSellerLogo(user.seller.logo);
        setSellerDescription(user.seller.description);
      }
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
          sellerName,
          sellerLogo,
          sellerDescription,
        })
      );
    }
  };
  return (
    <div className="container small-container">
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

          {user.isSeller && (
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
