import React, { useEffect, useState, Fragment } from "react";
// import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import MetaData from "../../Meta/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, forgotPassword } from "../../actions/userAction";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";
import logo from "../../assets/kalaevaniBlack.png";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { error, message } = useSelector((state) => state.forgotPassword);

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message]);

  return (
    <>
      <Fragment>
        <MetaData title={"Forgot Password"} />
        <Navbar props={logo} />
        <div className="forgotPasswordContainer">
          <div className="forgotPasswordBox">
            <h2 className="futuraLt updateHead">Forgot Password</h2>
            <p className="notice poppins">
              An email will be sent to your registered email to reset the
              password!{" "}
            </p>
            <form
              className="forgotPasswordForm"
              onSubmit={forgotPasswordSubmit}
            >
              <div className="forgotPasswordEmail">
                <div className="email">
                  <p className="emailText">Email</p>
                </div>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <input type="submit" value="Send" className="forgotPasswordBtn" />
            </form>
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default ForgotPassword;
