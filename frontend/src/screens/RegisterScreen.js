import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';

export default function RegisterScreen(props) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({
        type: 'REGISTER_RESET',
      });
    }
  }, [dispatch, error]);
  return (
    <div className="container small-container">
      <h1 className="my-3">Register</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            required
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            required
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
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
            required
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            required
            className="form-control"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div className="mb-3">
          <label />
          <button className="btn btn-primary" type="submit" disabled={loading}>
            Register
          </button>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        <div className="mb-3">
          <label />
          <div>
            Already have an account?{' '}
            <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
