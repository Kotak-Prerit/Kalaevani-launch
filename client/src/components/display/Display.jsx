import React, { useRef } from "react";
import styles from "./display.module.scss";
import Picture1 from "../../assets/d01.webp";
import Picture2 from "../../assets/d02.webp";
import Picture3 from "../../assets/d03.webp";
import Picture4 from "../../assets/d04.webp";
import Picture5 from "../../assets/d05.webp";
import Picture6 from "../../assets/d06.webp";
import Picture7 from "../../assets/d07.webp";
import { useScroll, useTransform, motion } from "framer-motion";

function Display() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  const pictures = [
    {
      src: Picture4,
      scale: scale4,
    },
    {
      src: Picture2,
      scale: scale5,
    },
    {
      src: Picture3,
      scale: scale6,
    },
    {
      src: Picture1,
      scale: scale5,
    },
    {
      src: Picture5,
      scale: scale6,
    },
    {
      src: Picture6,
      scale: scale8,
    },
    {
      src: Picture7,
      scale: scale9,
    },
  ];

  return (
    <div ref={container} className={styles.container}>
      <div className={styles.sticky}>
        {pictures.map(({ src, scale }, index) => {
          return (
            <motion.div key={index} style={{ scale }} className={styles.el}>
              <div className={styles.imageContainer}>
                <picture>
                  <source
                    srcSet={src.replace(".jpg", ".webp")}
                    type="image/webp"
                  />
                  <img
                    src={src}
                    alt="display-image"
                    loading="eager"
                    fetchpriority="high"
                  />
                </picture>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
export default Display;
