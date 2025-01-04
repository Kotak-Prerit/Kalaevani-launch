import React, { Fragment, lazy, Suspense } from "react";
import "./SR.css";

const Navbar = lazy(() => import("../../components/Navbar/Navbar"));
const Footer = lazy(() => import("../../components/Footer/Footer"));

const ShippingPolicy = () => {
  return (
    <Fragment>
      <Suspense>
        <Navbar />
        <div className="srContainer">
          <div className="shipping">
            <h1 className="futuraLt srHead">Shipping Policy</h1>
            <p className="srPara poppins">
              <ul>
                <li>
                  All the orders are dispatched within 24-48 hours post
                  reception.
                </li>
                <li>
                  Delivery of the ready to wear products usually takes 5-7
                  working days. However, custom and made to order pieces takes
                  7-10 working days.
                </li>
                <li>
                  Domestic orders -
                  <p className="spacing">
                    Prepaid orders are eligible for free shipping
                  </p>
                  <p className="spacing">
                    Orders placed on COD will attract a charge of 149/-
                  </p>
                </li>
                <li>
                  International orders -
                  <p className="spacing">
                    Orders above 200$ are eligible for free shipping
                  </p>
                  <p className="spacing">
                    Orders below 200$ will attract a fees of $42-$45 based on
                    the customers location
                  </p>
                </li>
                <li>
                  International shipping rates varies on the basis of weight,
                  dimensions and the countries import duties, where customers
                  are ordering from.
                </li>
                <li>
                  Taxes and Duties depend on your Shipping Destination. VAT,
                  Custom, and Import Duties are not included in our ordering
                  process but may be levied as per rules and regulations set
                  forth by your government.
                </li>
                <li>
                  If we are experiencing a high volume of orders, shipments may
                  be delayed by a few days. Please allow additional days in
                  transit for delivery. If there will be a significant delay in
                  shipment of your order, we will contact you via email or
                  telephone.
                </li>
                <li>SHIPMENT CONFIRMATION AND ORDER TRACKING</li>
                <li>
                  Once your order has been dispatched, tracking information is
                  provided on all orders which is included in the shipping
                  confirmation emails sent once the order has been shipped.
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

export default ShippingPolicy;
