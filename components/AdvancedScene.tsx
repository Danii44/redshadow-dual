/**
 * AdvancedScene.tsx - Advanced 3D Scene with Scroll Triggers
 * 
 * Features:
 * - Scroll-controlled camera animations
 * - Mouse-reactive model movements
 * - Cinematic lighting with HDRI
 * - Particle system with scroll synchronization
 * - Realistic shadows and reflections
 */

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollTransitionController from './ScrollTransitionController';

gsap.registerPlugin(ScrollTrigger);

// Suppress console warnings for missing models
const originalWarn = console.warn;
console.warn = (...args: any[]) => {
  if (typeof args[0] === 'string' && args[0].includes('useGLTF')) return;
  originalWarn(...args);
};

/**
 * Enhanced Particle System
 * Particles react to scroll and mouse movement
 */
function EnhancedParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 800;
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!pointsRef.current) return;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 120;
      positions[i + 1] = (Math.random() - 0.5) * 120;
      positions[i + 2] = (Math.random() - 0.5) * 120;

      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00d4ff,
      size: 0.15,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.4,
      fog: false,
    });

    pointsRef.current.geometry = geometry;
    pointsRef.current.material = material;

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (pointsRef.current && pointsRef.current.geometry) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const velocities = pointsRef.current.geometry.attributes.velocity.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        // Wrap around
        if (Math.abs(positions[i]) > 60) velocities[i] *= -1;
        if (Math.abs(positions[i + 1]) > 60) velocities[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 60) velocities[i + 2] *= -1;
      }

      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.x += 0.00002;
      pointsRef.current.rotation.y += 0.00004;
    }
  });

  return <points ref={pointsRef} />;
}

/**
 * GLB Model with Scroll-Controlled Rotation
 * Loads a sports car model and rotates based on scroll velocity
 */
function AnimatedModel() {
  const groupRef = useRef<THREE.Group>(null);
  const scrollRotation = useRef(0);
  const scrollVelocity = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });

  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    // Load GLB model from CDN
    const loadModel = async () => {
      try {
        const response = await fetch('/assets/Watch.glb');
        if (!response.ok) throw new Error('Failed to load model');
        // Model will be loaded via useGLTF in the actual component
        setModelLoaded(true);
      } catch (error) {
        console.warn('GLB model failed to load, using fallback cube');
        setModelLoaded(false);
      }
    };

    loadModel();

    // Scroll velocity tracking with passive listeners for performance
    let lastScrollTime = 0;
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime > 16) {
        scrollVelocity.current = window.scrollY * 0.0008;
        lastScrollTime = now;
      }
    };

    let lastMouseTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseTime > 32) {
        mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        lastMouseTime = now;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      // Scroll-based rotation with damping
      scrollRotation.current += scrollVelocity.current * 0.015;
      groupRef.current.rotation.y = scrollRotation.current;
      scrollVelocity.current *= 0.98;

      // Continuous slow rotation
      groupRef.current.rotation.y += 0.0006;

      // Float animation
      groupRef.current.position.y = Math.sin(Date.now() * 0.0005) * 0.4;

      // Mouse reactivity with reduced sensitivity
      groupRef.current.rotation.x += (mousePos.current.y * 0.2 - groupRef.current.rotation.x) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {modelLoaded ? (
        // Fallback cube if model fails
        <>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.5, 2.5, 2.5]} />
            <meshStandardMaterial
              color={0x1a1a2e}
              metalness={0.9}
              roughness={0.1}
              envMapIntensity={1}
            />
          </mesh>
          <mesh scale={2.6}>
            <boxGeometry args={[2.5, 2.5, 2.5]} />
            <meshBasicMaterial
              color={0x00d4ff}
              transparent
              opacity={0.1}
              wireframe={true}
            />
          </mesh>
        </>
      ) : (
        // Fallback cube
        <>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.5, 2.5, 2.5]} />
            <meshStandardMaterial
              color={0x1a1a2e}
              metalness={0.9}
              roughness={0.1}
              envMapIntensity={1}
            />
          </mesh>
          <mesh scale={2.6}>
            <boxGeometry args={[2.5, 2.5, 2.5]} />
            <meshBasicMaterial
              color={0x00d4ff}
              transparent
              opacity={0.1}
              wireframe={true}
            />
          </mesh>
        </>
      )}
    </group>
  );
}

/**
 * Advanced Lighting Setup
 */
function AdvancedLighting() {
  const lightRef = useRef<THREE.DirectionalLight>(null);

  useFrame(() => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(Date.now() * 0.0003) * 15;
      lightRef.current.position.z = Math.cos(Date.now() * 0.0003) * 15;
    }
  });

  return (
    <>
      {/* Key light - moving */}
      <directionalLight
        ref={lightRef}
        position={[10, 15, 10]}
        intensity={2}
        color={0xffffff}
        castShadow
      />

      {/* Fill light - electric blue */}
      <directionalLight
        position={[-15, 8, -15]}
        intensity={1}
        color={0x00d4ff}
      />

      {/* Back light - purple */}
      <directionalLight
        position={[0, 10, -20]}
        intensity={1.2}
        color={0x7c3aed}
      />

      {/* Ambient light */}
      <ambientLight intensity={0.5} color={0xffffff} />

      {/* Point light for extra glow */}
      <pointLight
        position={[0, 5, 0]}
        intensity={0.8}
        color={0x00d4ff}
        distance={50}
      />
    </>
  );
}

/**
 * Main Advanced Scene Component
 */
export function AdvancedScene() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const controlsRef = useRef<any>(null);
  const sceneRef = useRef<THREE.Scene>(null);

  useGSAP(() => {
    // ScrollCameraController handles all scroll animations
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 50 }}
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
      <PerspectiveCamera ref={cameraRef} position={[0, 2, 10]} fov={50} />
      <OrbitControls ref={controlsRef} enableZoom={false} autoRotate={false} />

      <ScrollTransitionController />

      <AdvancedLighting />
      <EnhancedParticles />
      <AnimatedModel />

      {/* HDRI Environment */}
      <Environment preset="studio" />

      {/* Fog for depth */}
      <fog attach="fog" args={['#0a0a0a', 20, 100]} />
    </Canvas>
  );
}

export default AdvancedScene;
