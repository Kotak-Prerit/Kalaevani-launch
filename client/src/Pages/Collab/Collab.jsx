import React, { Suspense, useRef, useState, lazy } from "react";
import emailjs from "@emailjs/browser";
import collab from "../../assets/collab.png";
import "../Contact/Contact.css";
import { toast } from "react-toastify";
import MetaData from "../../Meta/MetaData";
import logo from "../../assets/kalaevaniBlack.png";

const Navbar = lazy(() => import("../../components/Navbar/Navbar"));
const Footer = lazy(() => import("../../components/Footer/Footer"));

function Contact() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const formData = form.current;
    const name = formData.brand_name.value;
    const email = formData.business_email.value;
    const phone = formData.business_contact.value;

    const errors = {};

    if (name.length < 3) {
      errors.name = "Name must be at least 3 characters";
    }

    if (!/^[a-zA-Z0-9._%+-]{3,}@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(email)) {
      errors.email = "Invalid email address";
    }

    if (phone && (phone.length < 10 || phone.length > 10)) {
      errors.phone = "Phone number must be 10 digits";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    emailjs
      .sendForm("service_89xz4sp", "template_nnopsmp", form.current, {
        publicKey: "_K19r9dC2hGs8J9_9",
      })
      .then(() => {
        toast.success("We will get right back to you!");
        form.current.reset();
      })
      .catch((error) => {
        toast.error("An error occurred while sending the email:", error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <Suspense>
      <MetaData title="Collab with Kalaevani" />
      <Navbar props={logo} />
      <div className="contact-main" id="contact">
        <p className="contact-page-text">
          {" "}
          <img src={collab} alt="gif" className="prjctgif" />
          collab with us
        </p>
        <div className="contact-container">
          <div className="form-heading">
            <div className="brief_us_wrapper">
              <p className="brief_us poppins">Write your brief below</p>
            </div>
            <div className="tagline_wrapper">
              <p className="tagline poppins">
                Our team will reach out to you in 48 business hours...
              </p>
            </div>
          </div>
          <form className="form poppins" onSubmit={sendEmail} ref={form}>
            <div className="input_container">
              <div className="form_index">01</div>
              <div className="input_que">
                <p className="form_que">What's your Brand name?*</p>
                <input
                  type="text"
                  name="brand_name"
                  id="name"
                  placeholder="Milton"
                  className="input_name"
                  min={3}
                  max={25}
                  required
                />
                {errors.name && (
                  <div style={{ color: "red" }}>{errors.name}</div>
                )}
              </div>
            </div>
            <div className="input_container">
              <div className="form_index">02</div>
              <div className="input_que">
                <p className="form_que">What's your business email?*</p>
                <input
                  type="email"
                  className="contact-email"
                  name="business_email"
                  placeholder="milton@gmail.com"
                  id="email"
                  required
                  pattern="^[a-zA-Z0-9._%+-]{3,}@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$"
                />
                {errors.email && (
                  <div style={{ color: "red" }}>{errors.email}</div>
                )}
              </div>
            </div>
            <div className="input_container">
              <div className="form_index">03</div>
              <div className="input_que">
                <p className="form_que">
                  What's your business contact number?{" "}
                  {/* <span className="optional">optional</span> */}
                </p>
                <input
                  type="tel"
                  placeholder="9265092650"
                  name="business_contact"
                  id="phone"
                  className="contact-phone"
                  required
                  max={10}
                  min={10}
                />
                {errors.phone && (
                  <div style={{ color: "red" }}>{errors.phone}</div>
                )}
              </div>
            </div>
            <div className="input_container">
              <div className="form_index">04</div>
              <div className="input_que">
                <p className="form_que">
                  How can we help you ?{" "}
                  {/* <span className="optional">optional</span> */}
                </p>
                <textarea
                  name="business_message"
                  id="aboutProject"
                  cols="20"
                  rows="3"
                  placeholder="Describe it as you can"
                  className="poppins"
                ></textarea>
              </div>
            </div>
            <button type="submit" className="send" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </Suspense>
  );
}

export default Contact;
