import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function MiniPlanet3D({ inputs, mood = "neutral" }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      1, // Aspect ratio 1:1 para contenedor cuadrado
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    const size = mountRef.current.clientWidth;
    renderer.setSize(size, size);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Iluminación
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 3, 5);
    scene.add(pointLight);

    // Calcular tamaño del planeta basado en koi_prad
    const planetRadius = Math.min(Math.max((inputs.koi_prad || 1) * 0.3, 0.5), 2);

    // Geometría del planeta
    const geometry = new THREE.SphereGeometry(planetRadius, 32, 32);

    // Color basado en temperatura
    let planetColor = 0x6f42c1;
    const temp = inputs.koi_teq || 300;
    
    if (temp > 1000) planetColor = 0xff4444; // Muy caliente - rojo
    else if (temp > 600) planetColor = 0xff8844; // Caliente - naranja
    else if (temp > 400) planetColor = 0xffdd44; // Templado - amarillo
    else if (temp > 200) planetColor = 0x44aaff; // Frío - azul claro
    else planetColor = 0x2244aa; // Muy frío - azul oscuro

    const material = new THREE.MeshPhongMaterial({
      color: planetColor,
      emissive: planetColor,
      emissiveIntensity: 0.2,
      shininess: 30,
      specular: 0x555555,
    });

    const planet = new THREE.Mesh(geometry, material);
    scene.add(planet);

    // Atmósfera si la temperatura es adecuada (200-400K)
    if (temp >= 200 && temp <= 400 && inputs.koi_prad > 0.8) {
      const atmosphereGeometry = new THREE.SphereGeometry(planetRadius + 0.15, 32, 32);
      const atmosphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x44ddff,
        transparent: true,
        opacity: 0.3,
        side: THREE.BackSide,
      });
      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      scene.add(atmosphere);
    }

    // Anillos si es un planeta grande (>2 radios terrestres)
    if (inputs.koi_prad > 2) {
      const ringGeometry = new THREE.RingGeometry(planetRadius + 0.3, planetRadius + 0.8, 32);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x8866ff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
    }

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      planet.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [inputs, mood]);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100%",
        aspectRatio: "1/1",
        borderRadius: "12px",
        overflow: "hidden",
        background: "rgba(10, 5, 20, 0.8)",
      }}
    />
  );
}