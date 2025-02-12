import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import project from "../../assets/project.gif";
import "./Contact.css";
import { toast } from "react-toastify";
import logo from "../../assets/kalaevaniBlack.webp";
import MetaData from "../../Meta/MetaData";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Contact() {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const formData = form.current;
    const name = formData.user_name.value;
    const email = formData.user_email.value;
    const phone = formData.user_contact.value;

    const errors = {};

    if (name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!/^[a-zA-Z0-9._%+-]{3,}@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(email)) {
      errors.email = "Invalid email address";
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      errors.phone =
        "Enter a valid 10-digit Indian mobile number starting with 6-9";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    emailjs
      .sendForm("service_89xz4sp", "template_8oeqwao", form.current, {
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
        setIsSubmitting(true);
      });
  };

  return (
    <React.Fragment>
      <MetaData title="Contact Us" />
      <Navbar props={logo} />
      <div className="contact-main" id="contact">
        <p className="contact-page-text">
          {" "}
          <img src={project} alt="gif" className="prjctgif" />
          let's get connected
        </p>
        <div className="contact-container">
          <div className="form-heading">
            <div className="brief_us_wrapper">
              <p className="brief_us poppins">Write your query below</p>
            </div>
            <div className="tagline_wrapper">
              <p className="tagline poppins">
                Our notebook is open, and we're ready to take your brief...
              </p>
            </div>
          </div>
          <form className="form poppins" onSubmit={sendEmail} ref={form}>
            <div className="input_container">
              <div className="form_index">01</div>
              <div className="input_que">
                <p className="form_que">What's your name?*</p>
                <input
                  type="text"
                  name="user_name"
                  id="name"
                  placeholder="otis milburn"
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
                <p className="form_que">What's your email?*</p>
                <input
                  type="email"
                  className="contact-email"
                  name="user_email"
                  placeholder="otis@gmail.com"
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
                  What's your phone number?{" "}
                  {/* <span className="optional">optional</span> */}
                </p>
                <input
                  type="tel"
                  placeholder="9265092650"
                  name="user_contact"
                  id="phone"
                  className="contact-phone"
                  required
                  pattern="[6-9]{1}[0-9]{9}"
                  title="Enter a valid 10-digit Indian mobile number"
                  maxLength={10}
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
                  name="user_message"
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
    </React.Fragment>
  );
}

export default Contact;
