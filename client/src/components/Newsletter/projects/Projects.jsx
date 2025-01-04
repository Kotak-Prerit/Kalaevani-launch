import { useState } from "react";
import styles from "./style.module.scss";
import Titles from "./Titles/Titles";
import Descriptions from "./descriptions/Description";

const data = [
  {
    title: "Account",
    redirect: "/login",
    speed: 0.7,
  },
  {
    title: "Support",
    redirect: "/contact",
    speed: 0.7,
  },
  {
    title: "Term & condition",
    redirect: "/terms",
    speed: 0.72,
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className={styles.container}>
      <Titles data={data} setSelectedProject={setSelectedProject} />
      <Descriptions data={data} selectedProject={selectedProject} />
    </div>
  );
}
