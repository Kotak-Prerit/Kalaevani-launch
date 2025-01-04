import "./App.css";
import { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Lenis from "lenis";
import Home from "./Pages/Home/Home";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Products from "./Pages/Products/Products";
import Login from "./Pages/Login/Login";
import Account from "./Pages/Account/Account";
import store from "./store/store";
import { loadUser } from "./actions/userAction";
import UpdateProfile from "./Pages/updateProfile/UpdateProfile";
import UpdatePassword from "./Pages/UpdatePassword/UpdatePassword";
import PageNotFound from "./Pages/404/PageNotFound";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Cart from "./Pages/Cart/Cart";
import Shipping from "./Pages/Shipping/Shipping";
import About from "./Pages/About/About";
import ConfirmOrder from "./Pages/confirmOrder/confirmOrder";
import Payment from "./Pages/Payment/Payment";
import ShippingPolicy from "./Pages/ShippingReturn/ShippingPolicy";
import Contact from "./Pages/Contact/Contact";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import Terms from "./Pages/TermsAndConditions/Terms";
import ReturnRefund from "./Pages/ReturnAndRefund/ReturnRefund";
import Wholesale from "./Pages/Wholesale/Wholesale";
import ProductDetails from "./Pages/ProductDetails/ProductDetail";
import ProductImages from "./Pages/ProductImages/ProductImages";
import Collab from "./Pages/Collab/Collab";
import Dashboard from "./Pages/admin/admin-Pages/Dashboard/Dashboard";
import ProductList from "./Pages/admin/admin-Pages/ProductList/ProductList";
import NewProduct from "./Pages/admin/admin-Pages/NewProduct/NewProduct";
import OrderList from "./Pages/admin/admin-Pages/OrderList/OrderList";
// import ProtectedRoute from "../src/utils/Route/ProtectedRoute";
import Unauthorized from "./utils/Route/unauthorize";
import Faq from "./Pages/Faq/Faq";
import UserList from "./Pages/admin/admin-Pages/UserList/UserList";
import Success from "./Pages/success/Success";
import MyOrders from "./Pages/MyOrders/Myorders";
import OrderDetails from "./Pages/OrderDetails/OrderDetails";
import ProcessOrder from "./Pages/admin/admin-Pages/ProccessOrder/ProccessOrder.jsx";

function App() {
  const lenis = new Lenis();
  lenis.on("scroll", (e) => {});
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Fragment>
      <HelmetProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/product/:id/images" element={<ProductImages />} />
            <Route path="/faqs" element={<Faq />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account />} />
            <Route path="/me/change" element={<UpdateProfile />} />
            <Route path="/password/change" element={<UpdatePassword />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/about" element={<About />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />
            <Route path="/process/payment" element={<Payment />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/return-refund" element={<ReturnRefund />} />
            <Route path="/wholesale" element={<Wholesale />} />
            <Route path="/collab" element={<Collab />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/orders" element={<OrderList />} />
            <Route path="/admin/order/:id" element={<ProcessOrder />} />
            <Route path="/admin/product" element={<NewProduct />} />
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/success" element={<Success />} />
          </Routes>
        </Router>
      </HelmetProvider>
      <ToastContainer position="bottom-center" autoClose={2500} />
    </Fragment>
  );
}

export default App;
