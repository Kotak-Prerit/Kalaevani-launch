import React, { Fragment, lazy, Suspense } from "react";
import "./Wholesale.css";

const Navbar = lazy(() => import("../../components/Navbar/Navbar"));
const Footer = lazy(() => import("../../components/Footer/Footer"));
const WholesaleGrid = lazy(() =>
  import("../../components/Wholesale-Grid/WholesaleGrid")
);
const Steps = lazy(() => import("../../components/Steps/Steps"));
const Faqs = lazy(() => import("../../components/Faqs/Faqs"));
const BulkOrder = lazy(() => import("../../components/BulkOrders/BulkOrders"));

const Wholesale = () => {
  return (
    <Fragment>
      <Suspense>
        <Navbar />
        <WholesaleGrid />
        <Steps />
        <Faqs />
        <BulkOrder />
        <Footer />
      </Suspense>
    </Fragment>
  );
};

export default Wholesale;
