import { Canvas, useLoader } from "@react-three/fiber";
import { useRef } from "react";
import { useScroll } from "framer-motion";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { motion } from "framer-motion-3d";

export default function Earth() {
  const scene = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scene,
    offset: ["start end", "end start"],
  });

  const [color, normal, aoMap] = useLoader(TextureLoader, [
    "/color.jpg",
    "/normal.png",
    "/occlusion.jpg",
  ]);

  return (
    <Canvas ref={scene}>
      <ambientLight intensity={0.1} />
      <directionalLight intensity={3} position={[1, 0, -0.15]} />
      <motion.mesh
        scale={2.5}
        rotation={[Math.PI / 0.55, 0, 0]}
        rotation-y={scrollYProgress}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={color} normalMap={normal} aoMap={aoMap} />
      </motion.mesh>
    </Canvas>
  );
}
