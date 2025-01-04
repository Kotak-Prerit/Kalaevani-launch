import React, { useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const contentRefs = useRef([]);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How long will it take to get a bulk order?",
      answer:
        "Our team will generally inform you regarding an approximate timeline during the first call you receive from us.",
    },
    {
      question: "What is the minimum order quantity?",
      answer: `For wholesale the minimum order value is ₹5,00,000/-. Depending on your order size we will share final discounted rates. For project based or self design bulk orders, there is no minimum order restriction. Due to machinery and other utilisation processes the costs are always better with higher quantities.`,
    },
    {
      question: "What kind of fabrics are available?",
      answer:
        "At Kalaevani we utilise a range of fabrics like Cotton Terry, Cotton Fleece, Polar Fleece, Selvedge Denim, Artificial Leather, Artificial Suede, Nylon, Corduroy, etc. As per the requirements we will suggest the best suited fabrics, gsm, colors so you can take an informed decision.",
    },
    {
      question: "What kind of prints are available?",
      answer:
        "At Kalaevani we utilise a range of fabrics like Cotton Terry, Cotton Fleece, Polar Fleece, Selvedge Denim, Artificial Leather, Artificial Suede, Nylon, Corduroy, etc. As per the requirements we will suggest the best suited fabrics, gsm, colors so you can take an informed decision.",
    },
    {
      question: "What are the design charges?",
      answer:
        "If you already have your designs, there are no extra charges for design fees. If you require us to design a product, we estimate the charges based on the product and communicate it to you.",
    },
    {
      question: "Any question?",
      answer: "Please reach us on business@kalaevani.com for any enquiries",
    },
  ];

  return (
    <div className="faqs flex-center">
      <h1 className="faqs-head futuraLt">FAQ</h1>
      <div className="faq-container">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item flex-center">
            <div
              className="faq-question montserrat"
              onClick={() => toggleAnswer(index)}
            >
              <h3>{faq.question}</h3>
              <span className="toggle-icon">
                {activeIndex === index ? (
                  <MdKeyboardArrowUp className="faq-icon" />
                ) : (
                  <MdKeyboardArrowDown className="faq-icon" />
                )}
              </span>
            </div>
            <div
              className="faq-answer poppins"
              ref={(el) => (contentRefs.current[index] = el)}
              style={{
                maxHeight: activeIndex === index ? `100px` : "0",
                overflow: "hidden",
                transition: "max-height 200ms ease-in-out",
              }}
            >
              <p style={{ width: "90%" }}>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
