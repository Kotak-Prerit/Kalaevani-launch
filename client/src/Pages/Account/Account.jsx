import React, { Fragment } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Account.css";
import { useSelector } from "react-redux";
import { loadUser } from "../../actions/userAction";
import store from "../../store/store";
import MetaData from "../../Meta/MetaData";
import orderImg from "../../assets/order.png";
import profile from "../../assets/edit-profile.png";
import dashboard from "../../assets/dashboard.png";
import password from "../../assets/password.png";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout } from "../../actions/userAction";
import { useDispatch } from "react-redux";
import UserAccount from "../../components/UserAccount/UserAccount";
import Loader from "../../components/Loader/Loader";
import logo from "../../assets/kalaevaniBlack.png";

const Account = () => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const card = [
    {
      img: orderImg,
      heading: "Your orders",
      summary: "Track or history of your orders",
      func: orders,
    },
    {
      img: profile,
      heading: "Edit Profile",
      summary: "Edit Name, email, phone number, etc",
      func: editProfile,
    },
    {
      img: password,
      heading: "Change Password",
      summary: "Edit password",
      func: passwordFunc,
    },
  ];

  if (!user) {
    return null;
  }

  if (user.role === "admin") {
    card.unshift({
      img: dashboard,
      heading: "Dashboard",
      summary: "Create, add, update, delete functionalities for admin",
      func: power,
    });
  }

  function power() {
    navigate("/admin/dashboard");
  }
  function orders() {
    navigate("/orders");
  }
  function editProfile() {
    navigate("/me/change");
  }
  function logoutUser() {
    dispatch(logout());
    toast.success("Logged out Successfully");
    navigate("/");
  }
  function passwordFunc() {
    navigate("/password/change");
  }

  const createdAt = new Date(user.createdAt);
  const formattedDate = createdAt.toLocaleDateString("en-GB");

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`Kalaevani - ${user.name}`} />
          <Navbar props={logo} />
          <div className="profileWrapper">
            {isAuthenticated && (
              <Fragment>
                <div className="accountHeader">
                  <div className="nameEmail">
                    <p className="username poppins">{user.name}</p>
                    <p className="useremail poppins">{user.email}</p>
                  </div>
                  <div
                    className="userProfile flex-center"
                    style={{
                      backgroundColor: "#fff",
                    }}
                  >
                    <p className="avatarText poppins black">
                      {user.name.charAt(0)}
                    </p>
                  </div>
                </div>
                <div className="emptyFill">
                  <p className="createdAt poppins">
                    Joined on : {formattedDate}
                  </p>
                </div>
                <div className="accountOptionsWrapper">
                  <div className="accountOptions">
                    {card.map((content) => {
                      return (
                        <UserAccount
                          key={content.heading}
                          img={content.img}
                          head={content.heading}
                          summary={content.summary}
                          click={content.func}
                        />
                      );
                    })}
                  </div>

                  <div className="logout">
                    <button onClick={logoutUser}>
                      {" "}
                      <IoLogOutOutline />
                      log out
                    </button>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Account;
