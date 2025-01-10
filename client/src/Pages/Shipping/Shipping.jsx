import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../../Meta/MetaData";
import CheckoutSteps from "../../components/checkoutStepper/CheckoutSteps";
import { toast } from "react-toastify";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Shipping = () => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [houseNo, setHouseNo] = useState(shippingInfo.houseNo || "");
  const [street, setStreet] = useState(shippingInfo.street || "");
  const [zipCode, setZipCode] = useState(shippingInfo.zipCode || "");
  const [info, setInfo] = useState(shippingInfo.info || "");
  // const states = State.getStatesOfCountry("IN");
  const [selectedState, setSelectedState] = useState(shippingInfo.state || "");
  // const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(shippingInfo.city || "");
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo || "");
  const country = "India";

  const handleInputChange = async (e) => {
    const value = e.target.value;

    // Allow only numeric values and limit to 6 digits
    if (/^\d*$/.test(value) && value.length <= 6) {
      setZipCode(value);

      if (value.length === 6) {
        try {
          const response = await axios.get(
            `https://api.postalpincode.in/pincode/${value}`
          );
          const postState = response.data[0]?.PostOffice?.[0]?.State;

          if (postState) {
            setSelectedState(postState);
          } else {
            setSelectedState("No information found for this zipcode");
          }
        } catch (error) {
          setSelectedState("Error fetching data. Please try again.");
        }
      } else {
        setSelectedState("Type valid State");
      }
      if (value.length === 6) {
        try {
          const response = await axios.get(
            `https://api.postalpincode.in/pincode/${value}`
          );
          const district = response.data[0]?.PostOffice?.[0]?.District;

          if (district) {
            setSelectedCity(district);
          } else {
            setSelectedCity("No information found for this zipcode");
          }
        } catch (error) {
          setSelectedCity("Error fetching data. Please try again.");
        }
      } else {
        setSelectedCity("Type valid City");
      }
    }
  };

  const ShippingSubmit = (e) => {
    e.preventDefault();

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phoneNo)) {
      toast.error("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    dispatch(
      saveShippingInfo({
        houseNo,
        street,
        info,
        zipCode,
        city: selectedCity,
        state: selectedState,
        country,
        phoneNo,
      })
    );
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title={"Kalaevani- ShippingInfo"} />
      <div className="shippingContainer">
        <Link to={"/cart"} className="backBtnShipping flex-center">
          <MdOutlineKeyboardArrowLeft className="backBtn" />
        </Link>
        <CheckoutSteps activeStep={0} />
        <div className="shippingBox">
          <h1 className="shippingHeading poppins">Shipping Details</h1>
          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={ShippingSubmit}
          >
            <div className="shippingAddress">
              <div className="address">
                <p className="addressText">House/Door/FlatNo : </p>
              </div>
              <div className="passwordWrapper">
                <input
                  type="text"
                  placeholder="House/Door/FlatNo"
                  required
                  value={houseNo}
                  onChange={(e) => setHouseNo(e.target.value)}
                />
              </div>
            </div>
            <div className="shippingAddress">
              <div className="address">
                <p className="addressText">Street/Locality/Police Station : </p>
              </div>
              <div className="passwordWrapper">
                <input
                  type="text"
                  placeholder="Street/Locality/Police Station"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
            </div>
            <div className="pinCodeContainer">
              <div className="address">
                <p className="addressText">Enter Zip Code</p>
              </div>
              <div className="passwordWrapper">
                <input
                  type="text"
                  id="zipcode"
                  placeholder="enter zip code of your area"
                  max={6}
                  value={zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="shippingAddress">
              <div className="address">
                <p className="addressText">Enter Landmark</p>
              </div>
              <div className="passwordWrapper">
                <input
                  type="text"
                  placeholder="Landmark"
                  required
                  value={info}
                  onChange={(e) => setInfo(e.target.value)}
                />
              </div>
            </div>
            <div className="stateContainer">
              <div className="state">
                <p className="stateText">Enter City</p>
              </div>
              <div className="passwordWrapper">
                <input
                  type="text"
                  placeholder="city"
                  required
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                />
              </div>
            </div>
            <div className="cityContainer">
              <div className="city">
                <p className="cityText">Enter State</p>
              </div>
              <div className="passwordWrapper">
                <input
                  type="text"
                  placeholder="Landmark"
                  required
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                />
              </div>
            </div>

            <div className="countryContainer">
              <div className="country">
                <p className="countryText">Default Country</p>
              </div>
              <div className="passwordWrapper default">
                <input
                  type="text"
                  name="India"
                  id="country"
                  readOnly
                  value={"India"}
                />
              </div>
            </div>
            <div className="contactContainer">
              <div className="contact">
                <p className="contactText">Your contact</p>
              </div>
              <div className="passwordWrapper">
                <input
                  type="tel"
                  placeholder="Enter your 10-digit Indian phone number"
                  required
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                  maxLength={10}
                />
              </div>
            </div>
            <input
              type="submit"
              value="Continue"
              className="shippingBtn"
              // disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
