import React, { Fragment } from "react";
import notFound from "../../assets/404.png";
import logo from "../../assets/kalaevaniBlack.png";
import "./PageNotFound.css";
import { Link } from "react-router-dom";
import MetaData from "../../Meta/MetaData";

const PageNotFound = () => {
  return (
    <Fragment>
      <MetaData title={"404 🤨"} />
      <Link to="/">
        <img src={logo} alt="Home" className="logo404"></img>
      </Link>
      <div className="nfContainer">
        <img src={notFound} alt="notFound" className="nfImage"></img>
        <p className="nfHead futuraLt">Page Not Found</p>
        <p className="nfDesc t-a-c poppins">
          The page you are looking for might have been removed, had its name
          changed, doesn't exist or is temporarily unavailable.
        </p>
        <Link to="/" className="Home poppins">
          {" "}
          go to homepage
        </Link>
      </div>
    </Fragment>
  );
};

export default PageNotFound;
