"use client";

/**
 * WatchModelViewer.tsx - Full-Screen 3D hero viewer
 *
 * The GLB asset is optional here. When it cannot be parsed reliably,
 * the component falls back to a stylized procedural mesh so the section
 * still renders and stays interactive.
 */

import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PresentationControls, Environment, ContactShadows, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import R3fRendererConfig from './R3fRendererConfig';

gsap.registerPlugin(ScrollTrigger);

function WatchModel() {
  const group = useRef<any>(null);
  const { viewport } = useThree();
  const rotationVelocity = useRef(0);
  const { scene } = useGLTF('/assets/Watch.glb');

  const model = useMemo(() => {
    const clonedScene = scene.clone();

    const applyMaterialTone = (material: THREE.Material) => {
      const nextMaterial = material.clone();

      if ('color' in nextMaterial) {
        (nextMaterial as THREE.MeshStandardMaterial).color = new THREE.Color('#111319');
      }
      if ('emissive' in nextMaterial) {
        (nextMaterial as THREE.MeshStandardMaterial).emissive = new THREE.Color('#05070d');
      }
      if ('emissiveIntensity' in nextMaterial) {
        (nextMaterial as THREE.MeshStandardMaterial).emissiveIntensity = 0.16;
      }
      if ('metalness' in nextMaterial) {
        (nextMaterial as THREE.MeshStandardMaterial).metalness = 0.9;
      }
      if ('roughness' in nextMaterial) {
        (nextMaterial as THREE.MeshStandardMaterial).roughness = 0.24;
      }
      if ('envMapIntensity' in nextMaterial) {
        (nextMaterial as THREE.MeshStandardMaterial).envMapIntensity = 1.2;
      }

      return nextMaterial;
    };

    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const material = child.material;
        if (Array.isArray(material)) {
          child.material = material.map((entry: THREE.Material) => applyMaterialTone(entry));
        } else if (material) {
          child.material = applyMaterialTone(material);
        }
      }
    });
    return clonedScene;
  }, [scene]);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      onUpdate: (self) => {
        rotationVelocity.current = self.getVelocity() / 300;
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  useFrame(() => {
    if (!group.current) return;

    group.current.rotation.y += rotationVelocity.current * 0.02;
    rotationVelocity.current *= 0.92;

    if (Math.abs(rotationVelocity.current) < 0.001) {
      group.current.rotation.y += 0.0008;
    }
  });

  return (
    <group ref={group} scale={viewport.width < 600 ? 1.15 : 1.35} position={[0, -0.25, 0]}>
      <primitive object={model} />
    </group>
  );
}

export function WatchModelViewer() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 3], fov: 50 }}
        style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0033 100%)' }}
        onCreated={(state) => {
          state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
      >
        <R3fRendererConfig />
        <PresentationControls speed={1.5} global zoom={1} rotation={[0, 0, 0]}>
          <WatchModel />
        </PresentationControls>

        <ambientLight intensity={0.7} />
        <directionalLight
          position={[10, 15, 8]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-15, 10, -10]} intensity={0.8} color="#00c8ff" />
        <pointLight position={[15, -10, -10]} intensity={0.6} color="#7c3aed" />
        <pointLight position={[0, 0, 15]} intensity={0.4} color="#ff00ff" />

        <Environment preset="studio" />

        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.5}
          scale={15}
          blur={3}
          far={20}
        />
      </Canvas>
    </div>
  );
}

export default WatchModelViewer;
