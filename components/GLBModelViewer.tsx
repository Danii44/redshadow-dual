"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import R3fRendererConfig from './R3fRendererConfig';
import { useGLTF, PresentationControls, Environment, ContactShadows } from '@react-three/drei';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function Model({ url, isLight }: { url: string; isLight: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(url);
  const { size } = useThree();
  const scrollProgress = useRef(0);
  const modelReadyFired = useRef(false);

  // Fire a one-shot event after the first frame renders to ensure it's painted
  useFrame(() => {
    if (!modelReadyFired.current) {
      modelReadyFired.current = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.dispatchEvent(new CustomEvent('glb:ready'));
        });
      });
    }

    if (!group.current) return;

    group.current.rotation.y += scrollProgress.current * 0.012;
    scrollProgress.current *= 0.95;
  });

  const model = useMemo(() => {
    const clonedScene = scene.clone();

    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Check node name or parent node name (for nested mesh objects)
        const name = (child.name || '').toLowerCase();
        const parentName = (child.parent?.name || '').toLowerCase();
        const fullIdentifier = `${name} ${parentName}`;

        // 1. WATCH - 1 BODY (Solid Sleek Black)
        if (fullIdentifier.includes('ai watch') || fullIdentifier.includes('mesh_1')) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color('#0D0D12'), // Deep Obsidian Black
            metalness: 0.85,
            roughness: 0.2,
            envMapIntensity: 1.5,
          });
        }
        // 2. STRAPN 1 - 1 & STRAPN 2 - 1 (Dynamic Theme Toggle)
        else if (
          fullIdentifier.includes('strapn') ||
          fullIdentifier.includes('strap')
        ) {
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(isLight ? '#E3C2BC' : '#23212D'), // Light Lavender vs Dark Slate
            metalness: 0.1,
            roughness: 0.55,
            envMapIntensity: 0.8,
          });
        }
        // 3. ALL OTHER PARTS (Boxy button - 1, Knob - 1, pogopin-1..4)
        // Kept exactly as original GLB baked materials.
      }
    });

    return clonedScene;
  }, [scene, isLight]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = ScrollTrigger.create({
        onUpdate: (self) => {
          scrollProgress.current = self.getVelocity() / 300;
        },
        invalidateOnRefresh: true,
      });

      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', onLoad);

      return () => {
        window.removeEventListener('load', onLoad);
        trigger.kill();
      };
    });

    return () => ctx.revert();
  }, []);



  const isMobile = size.width < 768;
  const isTablet = size.width < 1024;

  return (
    <group
      ref={group}
      scale={isMobile ? 0.45 : isTablet ? 0.65 : 0.9}
      position={[0, -0.15, 0]}
    >
      <primitive object={model} />
    </group>
  );
}

function CanvasClearColor({ isLight }: { isLight: boolean }) {
  const { gl } = useThree();

  useEffect(() => {
    gl.setClearColor(new THREE.Color(isLight ? '#f4f1f9' : '#0a0813'), 1);
  }, [gl, isLight]);

  return null;
}

export function GLBModelViewer() {
  const [webglReady, setWebglReady] = useState(true);
  const [modelUrl] = useState(() => {
    if (typeof window !== 'undefined') {
      return new URL('/assets/Watch.glb', window.location.origin).href;
    }
    return '/assets/Watch.glb';
  });
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglReady(false);
      }
    } catch {
      setWebglReady(false);
    }
  }, []);

  const isLight = mounted && theme === 'light';
  const wrapperBackground = isLight ? 'rgba(244, 241, 249, 0.92)' : 'transparent';

  if (!webglReady) {
    return (
      <div className={`flex h-full w-full items-center justify-center ${isLight ? 'bg-purple-50 text-purple-900' : 'bg-[radial-gradient(circle_at_top,_#22073c,_#05050a)] text-cyan-300'}`}>
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.4em]">3D preview unavailable</p>
          <p className="mt-2 text-xs opacity-70">The browser could not initialize WebGL for the hero canvas.</p>
        </div>
      </div>
    );
  }

  const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;
  const isTabletDevice = typeof window !== 'undefined' && window.innerWidth < 1024;

  return (
    <div style={{ height: '100%', width: '100%', overflow: 'hidden', background: wrapperBackground, transition: 'background 0.45s ease' }}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: isMobileDevice ? 48 : 42 }}
        dpr={isMobileDevice ? 1 : isTabletDevice ? [1, 1.2] : [1, 1.5]}
        shadows={false}
        tabIndex={-1}
        gl={{
          antialias: !isMobileDevice,
          alpha: false,
          powerPreference: isMobileDevice ? 'default' : 'high-performance',
          premultipliedAlpha: false,
          // Lower precision on mobile saves GPU memory
          precision: isMobileDevice ? 'lowp' : 'highp',
        }}
        style={{
          width: '100%',
          height: '100%',
          background: wrapperBackground,
          display: 'block',
          transition: 'background 0.45s ease',
        }}
        onCreated={(state) => {
          state.gl.setClearColor(new THREE.Color(isLight ? '#f4f1f9' : '#0a0813'), 1);
          state.gl.setPixelRatio(isMobileDevice ? Math.min(window.devicePixelRatio, 1) : Math.min(window.devicePixelRatio, 1.5));
          const el = state.gl.domElement;
          el.tabIndex = -1;
          el.style.border = 'none';
          el.style.outline = 'none';
          el.style.boxShadow = 'none';
          el.style.background = wrapperBackground;
          // Allow vertical page scroll while keeping 3D drag interactions active
          try { el.style.touchAction = 'pan-y'; } catch (e) { /* ignore */ }
        }}
      >
        <R3fRendererConfig />
        <CanvasClearColor isLight={isLight} />
        <Suspense fallback={null}>
          <PresentationControls speed={isMobileDevice ? 3.5 : 1.5} global zoom={1} rotation={[0, 0, 0]}>
            <Model url={modelUrl} isLight={isLight} />
          </PresentationControls>

          {/* Lights — simplified on mobile to reduce GPU load */}
          <ambientLight intensity={isMobileDevice ? (isLight ? 1.6 : 1.4) : (isLight ? 1.2 : 0.95)} color={isLight ? '#f8f6ff' : '#c9d9ff'} />
          <directionalLight position={[5, 8, 5]} intensity={isLight ? 1.4 : 2.4} color="#ffffff" />
          {!isMobileDevice && (
            <>
              <hemisphereLight intensity={isLight ? 0.9 : 1.05} color={isLight ? '#efe9ff' : '#a7e4ff'} groundColor={isLight ? '#e6def6' : '#06070a'} />
              <directionalLight position={[-5, 4, -3]} intensity={isLight ? 0.6 : 0.6} color={isLight ? '#e9e2ff' : '#3b0764'} />
              <spotLight position={[0, 10, 6]} angle={0.5} penumbra={0.8} intensity={isLight ? 1.0 : 3.0} color={isLight ? '#fffaf8' : '#00c8ff'} />
            </>
          )}

          {/* Environment — use cheaper preset on mobile */}
          <Environment preset={isMobileDevice ? 'warehouse' : (isLight ? 'apartment' : 'city')} />

          {/* Contact shadows — desktop only (expensive blur pass) */}
          {!isMobileDevice && (
            <ContactShadows
              position={[0, -1.45, 0]}
              opacity={isLight ? 0.35 : 0.5}
              scale={14}
              blur={isLight ? 3.5 : 2.5}
              far={isLight ? 3.0 : 2}
              color={isLight ? '#4a3366' : '#000000'}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default GLBModelViewer;