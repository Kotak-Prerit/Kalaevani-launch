import React, { useEffect, useState, Fragment } from "react";
// import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";
import MetaData from "../../Meta/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  forgotPassword,
  resetPassword,
} from "../../actions/userAction";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";
import logo from "../../assets/kalaevaniBlack.webp";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState("");
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputRefs = React.useRef([]);

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split(" ");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const forgotPasswordSubmit = async (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("email", email);

    try {
      await dispatch(forgotPassword(myForm));
      setIsEmailSent(true);
      toast.success("OTP has been sent to your email.");
    } catch (error) {
      toast.error("Error sending email: " + error);
    }
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();

    const otpArray = inputRefs.current.map((e) => e.value);
    const otpValue = otpArray.join("");

    if (otpValue.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    setOtp(otpValue);
    setIsOtpSubmitted(true);
    toast.success("OTP verified successfully.");
  };

  const resetPasswordSubmit = async (e) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    try {
      await dispatch(resetPassword(email, otp, newPassword));
      toast.success("Password reset successfully.");
      setIsOtpSubmitted(false);
      setIsEmailSent(false);
      setEmail("");
      setNewPassword("");
    } catch (error) {
      toast.error("Error resetting password: " + error);
    }
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
            {!isEmailSent && (
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <h2 className="futuraLt updateHead">Forgot Password</h2>
                <p className="notice poppins">
                  An email will be sent to your registered email address to
                  reset the password!{" "}
                </p>
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

                <input
                  type="submit"
                  value="Send"
                  className="forgotPasswordBtn"
                />
              </form>
            )}

            {/* Verify OTP */}
            {!isOtpSubmitted && isEmailSent && (
              <form onSubmit={onSubmitOTP}>
                <h2 className="futuraLt updateHead">Reset password OTP</h2>
                <p className="notice poppins">
                  Enter the 6-digit OTP sent to your email
                </p>
                <div onPaste={handlePaste} className="otpBlocks">
                  {Array(6)
                    .fill(0)
                    .map((_, index) => (
                      <input
                        type="text"
                        maxLength={1}
                        key={index}
                        required
                        ref={(e) => (inputRefs.current[index] = e)}
                        onInput={(e) => handleInput(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                      />
                    ))}
                </div>
                <button className="forgotPasswordBtn">Submit</button>
              </form>
            )}

            {/* Reset new password */}
            {isOtpSubmitted && isEmailSent && (
              <form
                className="forgotPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <h2 className="futuraLt updateHead">New Password</h2>
                <p className="notice poppins">Enter the new password Below</p>
                <div className="forgotPasswordEmail">
                  <div className="email">
                    <p className="emailText">Password</p>
                  </div>
                  <input
                    type="password"
                    placeholder="Enter your new passowrd"
                    required
                    name="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Submit"
                  className="forgotPasswordBtn"
                />
              </form>
            )}
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default ForgotPassword;
