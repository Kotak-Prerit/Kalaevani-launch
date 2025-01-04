import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@mui/material";
import { RiBarcodeBoxLine, RiMotorbikeFill } from "react-icons/ri";
import { FaMoneyBillTransfer } from "react-icons/fa6";

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <RiMotorbikeFill />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <RiBarcodeBoxLine />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <FaMoneyBillTransfer />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };
  return (
    <Fragment>
      <Stepper
        className="process"
        alternativeLabel
        activeStep={activeStep}
        style={stepStyles}
      >
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              style={{
                color: activeStep >= index ? "#fff" : "#aaa",
              }}
              icon={item.icon}
              className="progress"
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
};

export default CheckoutSteps;
