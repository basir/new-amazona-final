import React from "react";

export default function CheckoutSteps(props) {
  return (
    <div className="row checkout-steps">
      <div className={props.step1 ? "col active" : "col"}>Sign-In</div>
      <div className={props.step2 ? "col active" : "col"}>Shipping</div>
      <div className={props.step3 ? "col active" : "col"}>Payment</div>
      <div className={props.step4 ? "col active" : "col"}>Place Order</div>
    </div>
  );
}
