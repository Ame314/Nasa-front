import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const PlanetVisualizer = ({ planetData }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Inicialización básica
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight
    );
    mountRef.current.appendChild(renderer.domElement);

    // Luz
    const light = new THREE.PointLight(0xf8b700, 2);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Planeta
    const geometry = new THREE.SphereGeometry(2, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      color: 0x6f42c1,
      roughness: 0.6,
      metalness: 0.2,
    });
    const planet = new THREE.Mesh(geometry, material);
    scene.add(planet);

    camera.position.z = 5;

    // Animación
    const animate = () => {
      planet.rotation.y += 0.002;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    // 🔥 Limpieza SEGURA
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // Cambia color del planeta si cambian los datos
  useEffect(() => {
    // Aquí puedes usar planetData para cambiar el color u otras propiedades
  }, [planetData]);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        height: "400px",
        borderRadius: "20px",
        overflow: "hidden",
      }}
    />
  );
};

export default PlanetVisualizer;
