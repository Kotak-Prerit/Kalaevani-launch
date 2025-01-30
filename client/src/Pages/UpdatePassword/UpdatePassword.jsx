import React, { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "./updatePassword.css";
import MetaData from "../../Meta/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadUser,
  updatePassword,
} from "../../actions/userAction";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import logo from "../../assets/kalaevaniBlack.webp";
import QuoteLoader from "../../utils/QuoteLoader/QuoteLoader";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [oldVisible, setOldVisible] = useState(false);
  const [newVisible, setNewVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Password updated succesfully 🥳");
      dispatch(loadUser());
      navigate("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, isUpdated, navigate]);
  return (
    <>
      {loading ? (
        <QuoteLoader />
      ) : (
        <Fragment>
          <MetaData title={"Update Password"} />
          <Navbar props={logo} />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="futuraLt updateHead">Change Password</h2>
              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <div className="password">
                    <p className="passwordText"> old password</p>
                  </div>
                  <div className="passwordWrapper">
                    <input
                      type={oldVisible ? "text" : "password"}
                      placeholder="Old Password"
                      required
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <div
                      className="eyeIcon"
                      onClick={() => {
                        setOldVisible(!oldVisible);
                      }}
                    >
                      {oldVisible ? <FaRegEye /> : <FaRegEyeSlash />}
                    </div>
                  </div>
                </div>
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
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default UpdatePassword;
