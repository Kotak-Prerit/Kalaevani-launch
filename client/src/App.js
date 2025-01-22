import "./App.css";
import { Fragment, useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Lenis from "lenis";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import { loadUser } from "./actions/userAction";
import "react-toastify/dist/ReactToastify.css";
import store from "./store/store";
const Home = lazy(() => import("./Pages/Home/Home"));
const Products = lazy(() => import("./Pages/Products/Products"));
const Login = lazy(() => import("./Pages/Login/Login"));
const Account = lazy(() => import("./Pages/Account/Account"));
const UpdateProfile = lazy(() => import("./Pages/updateProfile/UpdateProfile"));
const UpdatePassword = lazy(() =>
  import("./Pages/UpdatePassword/UpdatePassword")
);
const PageNotFound = lazy(() => import("./Pages/404/PageNotFound"));
const ForgotPassword = lazy(() =>
  import("./Pages/ForgotPassword/ForgotPassword")
);
const ResetPassword = lazy(() => import("./Pages/ResetPassword/ResetPassword"));
const Cart = lazy(() => import("./Pages/Cart/Cart"));
const Shipping = lazy(() => import("./Pages/Shipping/Shipping"));
const About = lazy(() => import("./Pages/About/About"));
const ConfirmOrder = lazy(() => import("./Pages/confirmOrder/confirmOrder"));
const Payment = lazy(() => import("./Pages/Payment/Payment"));
const ShippingPolicy = lazy(() =>
  import("./Pages/ShippingReturn/ShippingPolicy")
);
const Contact = lazy(() => import("./Pages/Contact/Contact"));
const PrivacyPolicy = lazy(() => import("./Pages/PrivacyPolicy/PrivacyPolicy"));
const Terms = lazy(() => import("./Pages/TermsAndConditions/Terms"));
const ReturnRefund = lazy(() => import("./Pages/ReturnAndRefund/ReturnRefund"));
const Wholesale = lazy(() => import("./Pages/Wholesale/Wholesale"));
const ProductDetails = lazy(() =>
  import("./Pages/ProductDetails/ProductDetail")
);
const ProductImages = lazy(() => import("./Pages/ProductImages/ProductImages"));
const Collab = lazy(() => import("./Pages/Collab/Collab"));
const Dashboard = lazy(() =>
  import("./Pages/admin/admin-Pages/Dashboard/Dashboard")
);
const ProductList = lazy(() =>
  import("./Pages/admin/admin-Pages/ProductList/ProductList")
);
const NewProduct = lazy(() =>
  import("./Pages/admin/admin-Pages/NewProduct/NewProduct")
);
const OrderList = lazy(() =>
  import("./Pages/admin/admin-Pages/OrderList/OrderList")
);
const Unauthorized = lazy(() => import("./utils/Route/unauthorize"));
const Faq = lazy(() => import("./Pages/Faq/Faq"));
const UserList = lazy(() =>
  import("./Pages/admin/admin-Pages/UserList/UserList")
);
const Success = lazy(() => import("./Pages/success/Success"));
const MyOrders = lazy(() => import("./Pages/MyOrders/Myorders"));
const OrderDetails = lazy(() => import("./Pages/OrderDetails/OrderDetails"));
const ProcessOrder = lazy(() =>
  import("./Pages/admin/admin-Pages/ProccessOrder/ProccessOrder.jsx")
);
const Loader = lazy(() => import("./components/Loader/Loader.jsx"));

function App() {
  const lenis = new Lenis();
  lenis.on("scroll", (e) => {});
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    window.scrollTo({ top: 0, behavior: "smooth" });
    return () => clearTimeout(timer);
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  // useEffect(() => {
  //   const handleKeyDown = (event) => {
  //     if (
  //       (event.ctrlKey || event.metaKey) &&
  //       event.shiftKey &&
  //       (event.code === "KeyJ" || event.code === "KeyI")
  //     ) {
  //       event.preventDefault();
  //     }

  //     // Disable F12
  //     if (event.code === "F12") {
  //       event.preventDefault();
  //     }
  //   };

  //   // Add the event listener
  //   document.addEventListener("keydown", handleKeyDown);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     document.removeEventListener("keydown", handleKeyDown);
  //   };
  // }, []);

  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Fragment>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <HelmetProvider>
            <Suspense
              fallback={
                <div className="loader loader--style3 flex-center">
                  <svg
                    version="1.1"
                    id="loader-1"
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="40px"
                    height="40px"
                    viewBox="0 0 50 50"
                    style={{ enableBackground: "new 0 0 50 50" }}
                  >
                    <path
                      fill="#000"
                      d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
                    >
                      <animateTransform
                        attributeType="xml"
                        attributeName="transform"
                        type="rotate"
                        from="0 25 25"
                        to="360 25 25"
                        dur="0.6s"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                </div>
              }
            >
              <Router>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:keyword" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route
                    path="/product/:id/images"
                    element={<ProductImages />}
                  />
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
                  <Route
                    path="/password/reset/:token"
                    element={<ResetPassword />}
                  />
                  <Route path="*" element={<PageNotFound />} />
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route
                    path="/admin/products897451569418741"
                    element={<ProductList />}
                  />
                  <Route
                    path="/admin/orders897451569418741"
                    element={<OrderList />}
                  />
                  <Route path="/admin/order/:id" element={<ProcessOrder />} />
                  <Route
                    path="/admin/product897451569418741"
                    element={<NewProduct />}
                  />
                  <Route
                    path="/admin/users897451569418741"
                    element={<UserList />}
                  />
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  <Route path="/success" element={<Success />} />
                </Routes>
              </Router>
            </Suspense>
          </HelmetProvider>
          <ToastContainer position="bottom-center" autoClose={2500} />
        </Fragment>
      )}
    </Fragment>
  );
}

export default App;
