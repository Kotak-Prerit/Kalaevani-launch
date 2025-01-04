import React, { useState } from "react";
import { IoIosArrowRoundForward, IoIosArrowRoundBack } from "react-icons/io";

const Steps = () => {
  const stepsData = [
    {
      id: 1,
      title: "Design",
      description:
        "If you have your designs or renders, share them with us to get started on costing and timeline. You can also employ our team in the design process. Design fees applicable.",
      image:
        "https://toffle.in/cdn/shop/files/P1190344.jpg?v=1695880447&width=832",
    },
    {
      id: 2,
      title: "Sampling",
      description:
        "Once the design is finalized, we move to the sampling stage where prototypes are made for approval before bulk production.",
      image:
        "https://toffle.in/cdn/shop/files/P1190311.jpg?v=1695881128&width=832",
    },
    {
      id: 3,
      title: "Advance",
      description:
        "After sample approval, production begins upon receiving an advance payment. We ensure the highest quality standards are met.",
      image:
        "https://toffle.in/cdn/shop/files/P1190392.jpg?v=1695881060&width=832",
    },
    {
      id: 4,
      title: "Delivery",
      description:
        "The final step involves delivery of the finished products, ensuring safe and timely arrival at your location.",
      image:
        "https://toffle.in/cdn/shop/files/P1190403.jpg?v=1695881180&width=832",
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prevStep) =>
      prevStep < stepsData.length - 1 ? prevStep + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) =>
      prevStep > 0 ? prevStep - 1 : stepsData.length - 1
    );
  };

  const handleStepClick = (index) => {
    setCurrentStep(index);
  };
  return (
    <div className="process-steps">
      <div className="steps-content">
        <div className="image-container">
          <img
            src={stepsData[currentStep].image}
            alt={stepsData[currentStep].title}
          />
        </div>
        <div className="text-content">
          <h4 className="poppins">Step {stepsData[currentStep].id}</h4>
          <h1 className="futuraLt">{stepsData[currentStep].title}</h1>

          <p className="poppins">{stepsData[currentStep].description}</p>
        </div>
      </div>

      <div className="navigation">
        <div className="steps-indicators">
          {stepsData.map((step, index) => (
            <div key={step.id} className="step">
              <div
                className={`step-dot ${index === currentStep ? "active" : ""}`}
                onClick={() => handleStepClick(index)}
              ></div>
              <span
                className={`step-label poppins ${
                  index === currentStep ? "active" : ""
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
        <div className="step-btns flex-center">
          <button className="Ws-arrow" onClick={handlePrev}>
            <IoIosArrowRoundBack className="arrow-icon" />
          </button>
          <button className="Ws-arrow" onClick={handleNext}>
            <IoIosArrowRoundForward className="arrow-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Steps;
