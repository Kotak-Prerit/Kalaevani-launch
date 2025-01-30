import React, { Fragment, lazy, Suspense } from "react";
import "../ShippingReturn/SR.css";
import logo from "../../assets/kalaevaniBlack.webp";
import MetaData from "../../Meta/MetaData";

const Navbar = lazy(() => import("../../components/Navbar/Navbar"));
const Footer = lazy(() => import("../../components/Footer/Footer"));

const ReturnRefund = () => {
  return (
    <Fragment>
      <Suspense>
        <MetaData title={"Return & refund Policy - Kalevani"} />
        <Navbar props={logo} />
        <div className="srContainer">
          <div className="shipping">
            <h1 className="futuraLt srHead">Return & Refund Policy</h1>
            <p className="srPara poppins">
              <ul>
                <li>
                  We have an exchange-only policy at the moment; Customers are
                  entitled for an exchange if they don't find the product(s)
                  true to their size
                </li>
                <li>
                  To be eligible for an exchange, item(s) must be in the same
                  condition as you received them. Products should be unworn or
                  unused, with tags, and in its original packaging box. You'll
                  also need the payment receipt or proof of purchase
                </li>

                <li>
                  We do not offer any refunds on the order. However, In case we
                  don't have your desired size available, you will be entitled
                  to choose an alternate product of the same amount.
                </li>
                <li>
                  Mode of return: Self-serve; Customer needs to bear the
                  shipping fees and send it back to the mailing address as we
                  don't have any return policy, and it should be sent back to us
                  within 24hrs of the purchase
                </li>
                <li>
                  Please ensure to raise an exchange request with us prior to
                  sending the products back, products shipped without raising
                  exchange request will not be accepted
                </li>
                <li>
                  Customers are requested to make a video while unboxing the
                  product so that if you receive a defective product we have
                  evidence of the same. In such a case the action taken would be
                  prompt because this would be backed by proof. In case no video
                  is received from your end we would have to go into detailed
                  examination of the product to process your request.
                </li>
              </ul>
            </p>
            <h1 className="futuraLt srHead">Damages and other issues</h1>
            <p className="srPara poppins">
              <ul>
                <li>
                  Please inspect your order upon reception and contact us within
                  12 hours post-delivery if the item is
                  defective/damaged/incorrect. We'll look into the situation
                  right away and provide the best resolution.
                </li>
                <li>
                  Reporting of defective/damaged/incorrect products post 12
                  hours will not be entertained.
                </li>
              </ul>
            </p>
            <h1 className="futuraLt srHead">Cancellation policy</h1>
            <p className="srPara poppins">
              <ul>
                <li>
                  Products that are dispatched from our end are not eligible for
                  cancellation
                </li>
                <li>
                  Cancellations can only be entertained if the order is still
                  processing and not dispatched.
                </li>
                <li>
                  Orders can be cancelled within 30minutes of placing the order
                  online. Please reach us via our contact page for any
                  cancellations.
                </li>
              </ul>
            </p>
          </div>
        </div>
        <Footer />
      </Suspense>
    </Fragment>
  );
};

export default ReturnRefund;
