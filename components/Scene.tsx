/**
 * Scene.tsx - Main 3D Scene Component
 * 
 * Design Philosophy: Futuristic Engineering Showroom
 * - Hero 3D model as the primary narrative vehicle
 * - Cinematic lighting with HDRI and realistic reflections
 * - Subtle particle system for continuous motion
 * - Smooth animations synchronized with scroll
 */

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import R3fRendererConfig from './R3fRendererConfig';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Particle System Component
 * Creates subtle floating particles around the scene
 */
function ParticleSystem() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 1000;

  useEffect(() => {
    if (!pointsRef.current) return;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.2,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.3,
    });

    pointsRef.current.geometry = geometry;
    pointsRef.current.material = material;
  }, []);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += 0.00005;
      pointsRef.current.rotation.y += 0.0001;
    }
  });

  return <points ref={pointsRef} />;
}

/**
 * Model Loader Component
 * Loads and animates the GLB 3D model
 */
function ModelLoader() {
  const modelRef = useRef<THREE.Group>(null);
  const [model, setModel] = useState<THREE.Group | null>(null);

  useEffect(() => {
    // For now, we'll create a placeholder cube
    // In production, replace with GLTFLoader to load the actual GLB model
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({
      color: 0x1a1a2e,
      metalness: 0.8,
      roughness: 0.2,
    });
    const mesh = new THREE.Mesh(geometry, material);
    setModel(mesh as any);
  }, []);

  useFrame(() => {
    if (modelRef.current) {
      // Slow rotation
      modelRef.current.rotation.y += 0.002;
      
      // Float animation
      modelRef.current.position.y = Math.sin(Date.now() * 0.0005) * 0.5;
    }
  });

  return (
    <group ref={modelRef}>
      {model && <primitive object={model} />}
      {!model && (
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial
            color={0x1a1a2e}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      )}
    </group>
  );
}

/**
 * Lighting Component
 * Sets up cinematic lighting with multiple light sources
 */
function Lighting() {
  return (
    <>
      {/* Key light */}
      <directionalLight
        position={[10, 10, 10]}
        intensity={1.5}
        color={0xffffff}
        castShadow
      />
      
      {/* Fill light */}
      <directionalLight
        position={[-10, 5, -10]}
        intensity={0.5}
        color={0x00d4ff}
      />
      
      {/* Back light */}
      <directionalLight
        position={[0, 5, -15]}
        intensity={0.8}
        color={0x7c3aed}
      />
      
      {/* Ambient light */}
      <ambientLight intensity={0.4} color={0xffffff} />
    </>
  );
}

/**
 * Main Scene Component
 */
export function Scene() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const controlsRef = useRef<any>(null);

  useGSAP(() => {
    // Scroll-triggered camera animations will be added here
    // This is a placeholder for the scroll trigger setup
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 50 }}
      gl={{
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
      }}
      style={{
        width: '100%',
        height: '100%',
        background: 'transparent',
      }}
    >
      <R3fRendererConfig />
      <PerspectiveCamera ref={cameraRef} position={[0, 2, 8]} fov={50} />
      <OrbitControls ref={controlsRef} enableZoom={false} />
      
      <Lighting />
      <ParticleSystem />
      <ModelLoader />
      
      {/* HDRI Environment - will be replaced with actual HDRI */}
      <Environment preset="studio" />
    </Canvas>
  );
}

export default Scene;
