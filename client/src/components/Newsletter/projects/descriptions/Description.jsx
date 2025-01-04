import React from "react";
import styles from "./style.module.scss";

export default function Index({ data, selectedProject }) {
  return (
    <div className={styles.descriptions}>
      {data.map((project, i) => {
        return (
          <div
            key={i}
            className={styles.description}
            style={{
              clipPath:
                selectedProject === i ? "inset(0 0 0)" : "inset(50% 0 50%)",
            }}
          >
            <p className="futuraLt"> &#12288;</p>
          </div>
        );
      })}
    </div>
  );
}
