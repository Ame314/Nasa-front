import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Planet3D({ mood = "neutral" }) {
  const mountRef = useRef(null);
  const planetRef = useRef(null);
  const atmosphereRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.0003);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xf8b700, 2, 100);
    pointLight.position.set(10, 5, 10);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x6f42c1, 1, 50);
    pointLight2.position.set(-10, -5, -10);
    scene.add(pointLight2);

    // Planet with enhanced materials
    const geometry = new THREE.SphereGeometry(2.5, 64, 64);
    
    const material = new THREE.MeshPhongMaterial({
      color: 0x6f42c1,
      emissive: 0x6f42c1,
      emissiveIntensity: 0.2,
      shininess: 30,
      specular: 0x666666,
    });

    const planet = new THREE.Mesh(geometry, material);
    scene.add(planet);
    planetRef.current = planet;

    // Atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(2.7, 64, 64);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x6f42c1,
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);
    atmosphereRef.current = atmosphere;

    // Particle field
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Ring system
    const ringGeometry = new THREE.RingGeometry(3.2, 4.5, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x6f42c1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2.5;
    scene.add(ring);

    // Animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Rotate planet
      if (planetRef.current) {
        planetRef.current.rotation.y += 0.003;
        planetRef.current.rotation.x = Math.sin(time * 0.3) * 0.1;
      }

      // Pulse atmosphere
      if (atmosphereRef.current) {
        atmosphereRef.current.rotation.y += 0.002;
        atmosphereRef.current.scale.setScalar(1 + Math.sin(time) * 0.02);
      }

      // Rotate ring
      ring.rotation.z += 0.001;

      // Rotate particles slowly
      particlesMesh.rotation.y += 0.0002;
      particlesMesh.rotation.x += 0.0001;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // React to mood changes
  useEffect(() => {
    if (!planetRef.current || !atmosphereRef.current) return;

    const moodColors = {
      habitable: { planet: 0x33ffaa, atmosphere: 0x33ffaa, emissive: 0x1a7f55 },
      gaseous: { planet: 0xffaa00, atmosphere: 0xffaa00, emissive: 0x7f5500 },
      hot: { planet: 0xff3333, atmosphere: 0xff3333, emissive: 0x7f1919 },
      cold: { planet: 0x0099ff, atmosphere: 0x0099ff, emissive: 0x004c7f },
      neutral: { planet: 0x6f42c1, atmosphere: 0x6f42c1, emissive: 0x37215f },
    };

    const colors = moodColors[mood] || moodColors.neutral;
    
    planetRef.current.material.color.setHex(colors.planet);
    planetRef.current.material.emissive.setHex(colors.emissive);
    atmosphereRef.current.material.color.setHex(colors.atmosphere);

  }, [mood]);

  return <div ref={mountRef} className="planet-background" />;
}