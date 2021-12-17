import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { signout } from "./actions/userActions";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderHistoryScreen from "./screens/OrderHistoryScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import SellerRoute from "./components/SellerRoute";
import SellerScreen from "./screens/SellerScreen";
import SearchBox from "./components/SearchBox";
import SearchScreen from "./screens/SearchScreen";
import { listProductCategories } from "./actions/productActions";
import LoadingBox from "./components/LoadingBox";
import MessageBox from "./components/MessageBox";
import MapScreen from "./screens/MapScreen";
import DashboardScreen from "./screens/DashboardScreen";
import SupportScreen from "./screens/SupportScreen";
import ChatBox from "./components/ChatBox";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div
        className={
          sidebarIsOpen
            ? "site-container active-cont d-flex flex-column"
            : "site-container d-flex flex-column"
        }
      >
        <ToastContainer position="bottom-center" />
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
                          <Link className="dropdown-item" to="/users">
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
              ? " active-nav side-navbar  d-flex justify-content-between flex-wrap flex-column"
              : "side-navbar d-flex justify-content-between flex-wrap flex-column"
          }
        >
          <ul className="nav flex-column text-white w-100 p-2">
            <li>
              <strong>Categories</strong>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c} className="nav-link">
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </div>

        <main className="container-fluid flex-fill mt-3">
          <Routes>
            <Route path="/seller/:id" element={<SellerScreen />}></Route>
            <Route path="/cart" element={<CartScreen />}></Route>
            <Route path="/cart/:id" element={<CartScreen />}></Route>
            <Route
              path="/product/:id"
              element={<ProductScreen />}
              exact
            ></Route>
            <Route
              path="/product/:id/edit"
              element={ProductEditScreen}
              exact
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
            <Route path="/search/name" element={<SearchScreen />} exact></Route>
            <Route
              path="/search/name/:name"
              element={<SearchScreen />}
              exact
            ></Route>
            <Route
              path="/search/category/:category"
              element={<SearchScreen />}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name"
              element={<SearchScreen />}
              exact
            ></Route>
            <Route
              path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
              element={<SearchScreen />}
              exact
            ></Route>

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
              path="/productlist/pageNumber/:pageNumber"
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

            <Route path="/" element={<HomeScreen />} exact></Route>
          </Routes>
        </main>
        <footer>
          {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
          <div className="text-center">All right reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
