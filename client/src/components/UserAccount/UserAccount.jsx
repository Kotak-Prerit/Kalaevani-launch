import React, { Fragment } from "react";

const UserAccount = (props) => {
  return (
    <Fragment>
      <div className="block poppins" onClick={props.click}>
        <img src={props.img} alt="icon" className="optionsImg" />
        <div className="yourOrders">
          <p className="orderHead">{props.head}</p>
          <p className="orderSummary">{props.summary}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default UserAccount;
