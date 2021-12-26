import React, { useContext, useState } from 'react';
import Helmet from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';

export default function ShippingAddressScreen() {
  const navigate = useNavigate();

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    addressMap,
    userInfo,
    cart: { shippingAddress },
  } = state;

  const [lat, setLat] = useState(shippingAddress.lat);
  const [lng, setLng] = useState(shippingAddress.lng);

  if (!userInfo) {
    navigate('/signin');
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [country, setCountry] = useState(shippingAddress.country || '');

  const submitHandler = (e) => {
    e.preventDefault();
    const newLat = addressMap ? addressMap.lat : lat;
    const newLng = addressMap ? addressMap.lng : lng;
    if (addressMap) {
      setLat(addressMap.lat);
      setLng(addressMap.lng);
    }
    let moveOn = true;
    // if (!newLat || !newLng) {
    //   moveOn = window.confirm(
    //     "You did not set your location on map. Continue?"
    //   );
    // }
    if (moveOn) {
      ctxDispatch({
        type: 'SAVE_SHIPPING_ADDRESS',
        payload: {
          fullName,
          address,
          city,
          postalCode,
          country,
          lat: newLat,
          lng: newLng,
        },
      });
      localStorage.setItem(
        'shippingAddress',
        JSON.stringify({
          fullName,
          address,
          city,
          postalCode,
          country,
          lat: newLat,
          lng: newLng,
        })
      );
      navigate('/payment');
    }
  };
  const chooseOnMap = () => {
    // ctxDispatch(
    //   saveShippingAddress({
    //     fullName,
    //     address,
    //     city,
    //     postalCode,
    //     country,
    //     lat,
    //     lng,
    //   })
    // );
    navigate('/map');
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <Helmet>
          <title>Shipping Address</title>
        </Helmet>
        <h1 className="my-3">Shipping Address</h1>

        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter full name"
              className="form-control"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              id="address"
              placeholder="Enter Address"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              id="city"
              placeholder="Enter City"
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="postalCode" className="form-label">
              Postal Code
            </label>
            <input
              type="text"
              id="postalCode"
              placeholder="Enter Postal Code"
              className="form-control"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <input
              type="text"
              id="country"
              placeholder="Enter Country"
              className="form-control"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            ></input>
          </div>

          <div className="mb-3">
            <button
              id="chooseOnMap"
              type="button"
              className="btn btn-light"
              onClick={chooseOnMap}
            >
              Choose Location On Map
            </button>
          </div>

          <div className="mb-3">
            <label />
            <button className="btn btn-primary" type="submit">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
