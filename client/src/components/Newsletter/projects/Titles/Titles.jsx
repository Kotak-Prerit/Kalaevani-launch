import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import {
  useScroll,
  motion,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { MdOutlineArrowOutward } from "react-icons/md";

export default function Index({ data, setSelectedProject }) {
  return (
    <div className={styles.titles}>
      {data.map((project, i) => {
        return (
          <Title
            key={i}
            data={{ ...project, i }}
            setSelectedProject={setSelectedProject}
          />
        );
      })}
    </div>
  );
}

function Title({ data, setSelectedProject }) {
  const { title, speed, i, redirect, sentTo } = data;
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", `${25 / speed}vw end`],
  });

  const clipProgress = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const clip = useMotionTemplate`inset(0 ${clipProgress}% 0 0)`;

  return (
    <Link to={redirect} className="td-none" target={sentTo}>
      <div
        ref={container}
        className={styles.title}
        onMouseOver={() => setSelectedProject(i)}
        onMouseLeave={() => setSelectedProject(null)}
      >
        <div className={styles.Twrapper}>
          <motion.p style={{ clipPath: clip }} className="futuraLt">
            {title}
          </motion.p>
          <p className="futuraLt">{title}</p>
          <MdOutlineArrowOutward className={styles.Tarrow} />
        </div>
      </div>
    </Link>
  );
}
