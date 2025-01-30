import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./MaterialPopup.css";
import { getProductDetails } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import gsm from "../../assets/GSM.webp";

const MaterialPopup = ({ isOpen, onClose, materialName }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { product } = useSelector((state) => state.productDetails);

  const [selectedMaterial, setSelectedMaterial] = useState({
    name: "",
    data: "",
  });

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    const careContent = product.care;
    const fabricContent = product.fabric;
    const artworkContent = product.artwork;
    switch (materialName) {
      case "fabric":
        setSelectedMaterial({
          name: "Fabric",
          data: fabricContent,
          image: gsm,
        });
        break;
      case "care":
        setSelectedMaterial({
          name: "care",
          data: careContent,
        });
        break;
      case "artwork":
        setSelectedMaterial({
          name: "artwork",
          data: artworkContent,
        });
        break;
      default:
        setSelectedMaterial({ name: "Default", data: "Default content..." });
        break;
    }
  }, [materialName, product.fabric, product.care, product.artwork]);

  useEffect(() => {
    const handleBodyScroll = (event) => {
      if (isOpen) {
        event.preventDefault();
      }
    };

    document.body.addEventListener("scroll", handleBodyScroll, {
      passive: false,
    });

    return () => {
      document.body.removeEventListener("scroll", handleBodyScroll);
    };
  }, [isOpen]);

  return (
    <Modal
      className="modal-open"
      isOpen={isOpen}
      onRequestClose={onClose}
      appElement={document.getElementById("root")}
      style={{
        overlay: {
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(5px)",
          zIndex: 10,
        },
      }}
    >
      <h2 className="pd-title Apercu" style={{ textTransform: "capitalize" }}>
        {selectedMaterial.name}
      </h2>
      <p className="pd-data poppins">{selectedMaterial.data}</p>
      <img
        src={selectedMaterial.image}
        alt={""}
        style={{ borderRadius: "10px" }}
        className="fabric-gsm"
      />
      <button onClick={onClose} className="off-btn poppins">
        close
      </button>
    </Modal>
  );
};

export default MaterialPopup;
