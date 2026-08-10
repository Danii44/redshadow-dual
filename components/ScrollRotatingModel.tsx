/**
 * ScrollRotatingModel.tsx - Scroll-Controlled 3D Model Rotation
 * 
 * Features:
 * - Smooth scroll-based rotation
 * - GSAP ScrollTrigger integration
 * - Realistic 3D visualization
 * - Performance optimized
 */

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import R3fRendererConfig from './R3fRendererConfig';
import { useGLTF, PresentationControls, Environment, ContactShadows, Preload } from '@react-three/drei';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRotatingModelProps {
  modelUrl?: string;
  scale?: number;
  position?: [number, number, number];
}

// Model component that rotates based on scroll
function RotatingModel({ url, scale = 1.5 }: { url: string; scale: number }) {
  const group = useRef<any>(null);
  const { scene } = useGLTF(url);
  const { viewport } = useThree();
  const rotationY = useRef(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const proxy = { rotation: 0 };

      ScrollTrigger.create({
        onUpdate: (self) => {
          // Map scroll progress to rotation (0 to 2π radians)
          gsap.to(proxy, {
            rotation: self.getVelocity() / 300,
            duration: 0.8,
            ease: 'power3.out',
          });
        },
        invalidateOnRefresh: true,
      });

      // Continuous rotation animation
      gsap.to(proxy, {
        rotation: Math.PI * 2,
        duration: 20,
        ease: 'none',
        repeat: -1,
        onUpdate: () => {
          rotationY.current = proxy.rotation;
        },
      });

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', onLoad);

      return () => {
        window.removeEventListener('load', onLoad);
      };
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = rotationY.current;
    }
  });

  return (
    <group ref={group} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

export function ScrollRotatingModel({
  modelUrl = '/assets/Watch.glb',
  scale = 1.5,
  position = [0, 0, 4],
}: ScrollRotatingModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload the model
    setIsLoading(false);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen flex items-center justify-center relative"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0033 50%, #0a0a0a 100%)',
      }}
    >
      {isLoading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-cyan-400 font-mono">Loading 3D Model...</p>
        </div>
      ) : (
        <Canvas
          camera={{ position, fov: 50 }}
          style={{ width: '100%', height: '100%' }}
        >
          <R3fRendererConfig />
          <PresentationControls
            speed={1.5}
            global
            zoom={1}
            rotation={[0, 0, 0]}
          >
            <RotatingModel url={modelUrl} scale={scale} />
          </PresentationControls>

          {/* Advanced Lighting Setup */}
          <ambientLight intensity={0.7} />
          <directionalLight
            position={[15, 15, 8]}
            intensity={1.5}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <pointLight position={[-15, -10, -8]} intensity={0.8} color="#00c8ff" />
          <pointLight position={[15, -10, -8]} intensity={0.8} color="#7c3aed" />
          <pointLight position={[0, 10, 10]} intensity={0.6} color="#ff00ff" />

          {/* Environment */}
          <Environment preset="studio" />

          {/* Shadow */}
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.5}
            scale={15}
            blur={3}
            far={10}
          />

          <Preload all />
        </Canvas>
      )}

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            Scroll to Rotate
          </h2>
          <p className="text-cyan-400 font-mono text-sm drop-shadow-lg">
            Interactive 3D Model Visualization
          </p>
        </div>
      </div>
    </div>
  );
}

export default ScrollRotatingModel;
