import React, { useEffect, useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ResetPassword.css";
import MetaData from "../../Meta/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, resetPassword } from "../../actions/userAction";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";
import Loader from "../../components/Loader/Loader";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import logo from "../../assets/kalaevaniBlack.png";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [newVisible, setNewVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Password changed succesfully 🥳");
      dispatch(loadUser());
      navigate("/login");
    }
  }, [dispatch, error, success, navigate]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Reset Password"} />
          <Navbar props={logo} />
          <div className="resetPasswordContainer">
            <div className="resetPasswordBox">
              <h2>{token}</h2>
              <h2 className="futuraLt updateHead">Change Password</h2>
              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div className="loginPassword">
                  <div className="password">
                    <p className="passwordText">new password</p>
                  </div>
                  <div className="passwordWrapper">
                    <input
                      type={newVisible ? "text" : "password"}
                      placeholder="New Password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <div
                      className="eyeIcon"
                      onClick={() => {
                        setNewVisible(!newVisible);
                      }}
                    >
                      {newVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                    </div>
                  </div>
                </div>
                <div className="loginPassword">
                  <div className="password">
                    <p className="passwordText">confirm password</p>
                  </div>
                  <div className="passwordWrapper">
                    <input
                      type={confirmVisible ? "text" : "password"}
                      placeholder="Confirm Password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <div
                      className="eyeIcon"
                      onClick={() => {
                        setConfirmVisible(!confirmVisible);
                      }}
                    >
                      {confirmVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                    </div>
                  </div>
                </div>

                <input
                  type="submit"
                  value="Change Password"
                  className="resetPasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default ResetPassword;
