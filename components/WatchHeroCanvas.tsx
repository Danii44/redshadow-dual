"use client";

import React, { Suspense, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls, useGLTF } from '@react-three/drei';
import { useTheme } from '@/contexts/ThemeContext';
import * as THREE from 'three';

type Props = {
  className?: string;
  modelPath?: string;
};

function WatchModel({ isDark, modelPath = '/assets/Watch.glb' }: { isDark: boolean; modelPath?: string }) {
  const gltf = useGLTF(modelPath) as any;
  const nodes = gltf?.nodes as Record<string, any> | undefined;

  if (!nodes) {
    console.warn('WatchHeroCanvas: model nodes not found for', modelPath);
    return null;
  }

  // Safely read geometries
  const casingGeo = nodes['Ai watch - 1']?.geometry;
  const buttonGeo = nodes['Boxy button - 1']?.geometry;
  const knobGeo = nodes['Knob-1']?.geometry;
  const pogopins = [
    nodes['pogopin-1']?.geometry,
    nodes['pogopin-2']?.geometry,
    nodes['pogopin-3']?.geometry,
    nodes['pogopin-4']?.geometry,
  ];
  const strapTopGeo = nodes['Strapn 1-1']?.geometry;
  const strapBottomGeo = nodes['Strapn 2-1']?.geometry;

  // Create explicit materials per spec and ensure Blender materials are not relied on
  const materials = useMemo(() => {
    const m: Record<string, THREE.MeshStandardMaterial> = {} as any;

    if (!isDark) {
      m.casing = new THREE.MeshStandardMaterial({ color: '#C2B2DE', metalness: 0.7, roughness: 0.25 });
      m.strap = new THREE.MeshStandardMaterial({ color: '#E2DFEB', metalness: 0.1, roughness: 0.6 });
      m.button = new THREE.MeshStandardMaterial({ color: '#D4D4D8', metalness: 0.95, roughness: 0.1 });
      m.pogo = new THREE.MeshStandardMaterial({ color: '#F59E0B', metalness: 1.0, roughness: 0.15 });
    } else {
      m.casing = new THREE.MeshStandardMaterial({ color: '#1A1A24', metalness: 0.8, roughness: 0.2 });
      m.strap = new THREE.MeshStandardMaterial({ color: '#111118', metalness: 0.1, roughness: 0.7 });
      m.button = new THREE.MeshStandardMaterial({ color: '#D4D4D8', metalness: 0.95, roughness: 0.1 });
      m.pogo = new THREE.MeshStandardMaterial({ color: '#F59E0B', metalness: 1.0, roughness: 0.15 });
    }

    // tweak: ensure materials support shadows and are physically correct
    Object.values(m).forEach((mat) => {
      mat.toneMapped = true;
    });

    return m;
  }, [isDark]);

  // Dispose materials on unmount to avoid memory leaks
  useEffect(() => {
    return () => {
      Object.values(materials).forEach((mat) => mat.dispose && mat.dispose());
    };
  }, [materials]);

  return (
    <group dispose={null} rotation={[0, Math.PI, 0]}>
      {/* Casing */}
      {casingGeo ? (
        <mesh geometry={casingGeo} material={materials.casing} castShadow receiveShadow />
      ) : (
        <></>
      )}

      {/* Rectangular side button */}
      {buttonGeo ? <mesh geometry={buttonGeo} material={materials.button} castShadow receiveShadow /> : null}

      {/* Circular crown knob */}
      {knobGeo ? <mesh geometry={knobGeo} material={materials.button} castShadow receiveShadow /> : null}

      {/* Pogopins */}
      {pogopins.map((g, i) => (g ? <mesh key={i} geometry={g} material={materials.pogo} castShadow receiveShadow /> : null))}

      {/* Straps */}
      {strapTopGeo ? <mesh geometry={strapTopGeo} material={materials.strap} castShadow receiveShadow /> : null}
      {strapBottomGeo ? <mesh geometry={strapBottomGeo} material={materials.strap} castShadow receiveShadow /> : null}
    </group>
  );
}

export const WatchHeroCanvas: React.FC<Props> = ({ className, modelPath = '/assets/Watch.glb' }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Preload model (non-blocking)
  useEffect(() => {
    try {
      useGLTF.preload(modelPath);
    } catch (e) {
      // ignore if preload not supported
    }
  }, [modelPath]);

  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 35 }}>
        {/* Lighting per spec */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />

        <Suspense fallback={null}>
          <WatchModel isDark={isDark} modelPath={modelPath} />

          <Environment preset="city" />
          <ContactShadows position={[0, -1.4, 0]} opacity={0.5} blur={2} far={4} scale={10} resolution={1024} color={isDark ? '#000000' : '#5b4a78'} />
        </Suspense>

        <OrbitControls autoRotate autoRotateSpeed={0.8} enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default WatchHeroCanvas;
