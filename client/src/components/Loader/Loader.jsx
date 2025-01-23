import React, { useState, useEffect } from "react";
import "./Loader.css";

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1; // Increment progress
        } else {
          clearInterval(interval); // Stop when it reaches 100
          return 100;
        }
      });
    }, 30); // Adjust speed as needed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-main">
      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.progress,
            width: `${progress}%`,
          }}
        ></div>
      </div>
      <p style={styles.percentage} className="progressPercentage">
        {progress}%
      </p>
    </div>
  );
};

const styles = {
  progressBar: {
    width: "80%",
    height: "7px",
    backgroundColor: "#000",
    borderRadius: "5px",
    overflow: "hidden",
    marginBottom: "10px",
  },
  progress: {
    height: "100%",
    backgroundColor: "#4caf50",
    transition: "width 0.1s ease-in-out",
  },
  percentage: {
    fontSize: "18px",
    fontWeight: "bold",
  },
};

export default Loader;
