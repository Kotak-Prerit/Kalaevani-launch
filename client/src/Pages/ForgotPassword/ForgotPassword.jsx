import React, { useEffect, useState, Fragment } from "react";
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
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, message } = useSelector((state) => state.forgotPassword);

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [visible, setVisible] = useState(false);

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
    setIsEmailSent(false); // Reset email sent state
    const myForm = new FormData();
    myForm.set("email", email);
    try {
      await dispatch(forgotPassword(myForm));
      setIsEmailSent(true);
      toast.success("OTP sent to your email!");
    } catch (error) {
      toast.error("Error sending email: " + error);
    }
  };

  const resetPasswordSubmit = async (e) => {
    e.preventDefault();

    // Collect OTP from input fields
    const otpArray = inputRefs.current.map((input) => input.value);
    const otp = otpArray.join("");

    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    setIsUpdatingPassword(true);

    try {
      const response = await dispatch(resetPassword(email, otp, newPassword));
      if (response?.success) {
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        toast.error(response.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Error resetting password: " + error.message);
    } finally {
      setIsUpdatingPassword(false);
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
            {!isEmailSent ? (
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <h2 className="futuraLt updateHead">Forgot Password</h2>
                <p className="notice poppins">
                  An email will be sent to your registered email address to
                  reset the password!
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
                  value="Send OTP"
                  className="forgotPasswordBtn"
                />
              </form>
            ) : (
              <form
                className="forgotPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <h2 className="futuraLt updateHead">Reset Password</h2>
                <p className="notice poppins">
                  Enter the OTP sent to your email and a new password
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
                        ref={(el) => (inputRefs.current[index] = el)}
                        onInput={(e) => handleInput(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                      />
                    ))}
                </div>
                <div className="hr"></div>
                <div className="forgotPasswordEmail">
                  <div className="email">
                    <p className="emailText">New Password</p>
                  </div>
                  <div className="relativeContainer">
                    <input
                      type={visible ? "text" : "password"}
                      placeholder="Enter your new password"
                      required
                      name="password"
                      className="newpassword_input"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <div
                      className="poppins eyeIconText"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? "Hide" : "Show"}
                    </div>
                  </div>
                </div>
                <input
                  type="submit"
                  value={isUpdatingPassword ? "Resetting..." : "Reset Password"}
                  className="forgotPasswordBtn"
                  disabled={isUpdatingPassword}
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
