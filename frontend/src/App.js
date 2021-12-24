import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import SigninScreen from './screens/SigninScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import MapScreen from './screens/MapScreen';
import DashboardScreen from './screens/DashboardScreen';
import SupportScreen from './screens/SupportScreen';
import ChatBox from './components/ChatBox';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from './store';
import { getError } from './utils';
import Axios from 'axios';

function App() {
  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippinhAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const { data } = await Axios.get(`/api/products/categories`);
      setCategories(data);
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? 'site-container active-cont d-flex flex-column'
            : 'site-container d-flex flex-column'
        }
      >
        <ToastContainer position="bottom-center" limit={1} />
        <header>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
              <button
                className="btn btn-dark"
                onClick={() => setSidebarIsOpen(!sidebarIsOpen)}
              >
                <i className="fas fa-bars"></i>
              </button>
              <Link className="navbar-brand" to="/">
                amazona
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <i className="fas fa-ellipsis-v"></i>
              </button>
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <SearchBox />

                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to="/cart" className="nav-link">
                      Cart
                      {cartItems.length > 0 && (
                        <span className="badge rounded-pill bg-danger">
                          {cartItems.length}
                        </span>
                      )}
                    </Link>
                  </li>
                  {userInfo ? (
                    <li className="nav-item dropdown">
                      <Link
                        to="#"
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {userInfo.name}
                      </Link>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <li>
                          <Link className="dropdown-item" to="/profile">
                            User Profile
                          </Link>
                        </li>

                        <li>
                          <Link className="dropdown-item" to="/orderhistory">
                            Order History
                          </Link>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            to="#signout"
                            onClick={signoutHandler}
                          >
                            Sign Out
                          </Link>
                        </li>
                      </ul>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <Link className="nav-link" to="/signin">
                        Sign In
                      </Link>
                    </li>
                  )}

                  {userInfo && userInfo.isSeller && (
                    <li className="nav-item dropdown">
                      <Link
                        to="#"
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Seller
                      </Link>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <li>
                          <Link
                            className="dropdown-item"
                            to="/productlist/seller"
                          >
                            Products
                          </Link>
                        </li>

                        <li>
                          <Link
                            className="dropdown-item"
                            to="/orderlist/seller"
                          >
                            Orders
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}

                  {userInfo && userInfo.isAdmin && (
                    <li className="nav-item dropdown">
                      <Link
                        to="#"
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Admin
                      </Link>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <li>
                          <Link className="dropdown-item" to="/dashboard">
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/productlist">
                            Products
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/orderlist">
                            Orders
                          </Link>
                        </li>

                        <li>
                          <Link className="dropdown-item" to="/userlist">
                            Users
                          </Link>
                        </li>
                      </ul>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <div
          className={
            sidebarIsOpen
              ? ' active-nav side-navbar  d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <ul className="nav flex-column text-white w-100 p-2">
            <li>
              <strong>Categories</strong>
            </li>
            {categories.map((category) => (
              <li key={category} className="nav-link">
                <Link
                  to={`/search?category=${category}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <main className="container mt-3">
          <Routes>
            <Route path="/seller/:id" element={<SellerScreen />}></Route>
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/cart/:id" element={<CartScreen />}></Route>

            <Route path="/product/:id" element={<ProductScreen />}></Route>
            <Route
              path="/product/:id/edit"
              element={<ProductEditScreen />}
            ></Route>
            <Route path="/signin" element={<SigninScreen />}></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
            <Route path="/payment" element={<PaymentMethodScreen />}></Route>
            <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
            <Route path="/order/:id" element={<OrderScreen />}></Route>
            <Route
              path="/orderhistory"
              element={<OrderHistoryScreen />}
            ></Route>
            <Route path="/search" element={<SearchScreen />}></Route>

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfileScreen />
                </PrivateRoute>
              }
            />
            <Route
              path="/map"
              element={
                <PrivateRoute>
                  <MapScreen />
                </PrivateRoute>
              }
            />

            <Route
              path="/productlist"
              element={
                <AdminRoute>
                  <ProductListScreen />
                </AdminRoute>
              }
            />

            <Route
              path="/orderlist"
              element={
                <AdminRoute>
                  <OrderListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/userlist"
              element={
                <AdminRoute>
                  <UserListScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/user/:id/edit"
              element={
                <AdminRoute>
                  <UserEditScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <DashboardScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/support"
              element={
                <AdminRoute>
                  <SupportScreen />
                </AdminRoute>
              }
            />
            <Route
              path="/productlist/seller"
              element={
                <SellerRoute>
                  <ProductListScreen />
                </SellerRoute>
              }
            />
            <Route
              path="/orderlist/seller"
              element={
                <SellerRoute>
                  <OrderListScreen />
                </SellerRoute>
              }
            />

            <Route path="/" element={<HomeScreen />}></Route>
          </Routes>
        </main>
        <footer>
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div className="text-center">All Rights Reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
