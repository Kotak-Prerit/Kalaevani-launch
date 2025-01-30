import React, { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "./updateProfile.css";
import MetaData from "../../Meta/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { toast } from "react-toastify";
import Navbar from "../../components/Navbar/Navbar";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import QuoteLoader from "../../utils/QuoteLoader/QuoteLoader";
import logo from "../../assets/kalaevaniBlack.webp";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const updateprofileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    dispatch(updateProfile(myForm));
  };

  useEffect(() => {
    if (user && user.avatar) {
      setName(user.name);
      setEmail(user.email);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Profile updated succesfully 🥳");
      dispatch(loadUser());
      navigate("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, user, isUpdated, navigate]);

  return (
    <>
      {loading ? (
        <QuoteLoader />
      ) : (
        <Fragment>
          <MetaData title={"Update Profile"} />
          <Navbar props={logo} />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="futuraLt updateHead">Update Profile</h2>
              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updateprofileSubmit}
              >
                <div className="updateProfileName">
                  <div className="name">
                    <p className="nameText">Username</p>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="updateProfileEmail">
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
                  value="Update Profile"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Profile;
