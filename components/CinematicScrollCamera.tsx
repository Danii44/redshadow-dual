/**
 * CinematicScrollCamera.tsx - Advanced Cinematic Scroll-Triggered Camera System
 * 
 * Features:
 * - Smooth orbital camera movements synchronized with scroll
 * - Section-specific camera sequences with easing
 * - Dynamic depth-of-field and lighting adjustments
 * - Parallax effects for UI elements
 * - Performance-optimized scroll tracking
 */

import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

interface CameraKeyframe {
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  easing: string;
}

export function CinematicScrollCamera() {
  const { camera: baseCamera, scene } = useThree();
  const camera = baseCamera as THREE.PerspectiveCamera;
  const cameraStateRef = useRef({
    targetPos: new THREE.Vector3(0, 2, 10),
    targetLookAt: new THREE.Vector3(0, 0, 0),
    currentFOV: 50,
  });

  // Define cinematic camera keyframes for each section
  const keyframes: Record<string, CameraKeyframe[]> = {
    hero: [
      {
        position: [0, 2, 10],
        target: [0, 0, 0],
        fov: 50,
        easing: 'power2.inOut',
      },
      {
        position: [12, 4, 8],
        target: [0, 0, 0],
        fov: 48,
        easing: 'power2.inOut',
      },
    ],
    services: [
      {
        position: [12, 4, 8],
        target: [0, 0, 0],
        fov: 48,
        easing: 'power2.inOut',
      },
      {
        position: [-10, 5, 10],
        target: [0, 0, 0],
        fov: 46,
        easing: 'power2.inOut',
      },
    ],
    portfolio: [
      {
        position: [-10, 5, 10],
        target: [0, 0, 0],
        fov: 46,
        easing: 'power2.inOut',
      },
      {
        position: [8, 3, -10],
        target: [0, 0, 0],
        fov: 50,
        easing: 'power2.inOut',
      },
    ],
    contact: [
      {
        position: [8, 3, -10],
        target: [0, 0, 0],
        fov: 50,
        easing: 'power2.inOut',
      },
      {
        position: [0, 8, 15],
        target: [0, 0, 0],
        fov: 42,
        easing: 'power2.inOut',
      },
    ],
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create main scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          invalidateOnRefresh: true,
          markers: false,
        },
      });

    // Hero section - Initial orbit
    tl.to(
      cameraStateRef.current.targetPos,
      {
        x: 12,
        y: 4,
        z: 8,
        duration: 1,
        ease: 'power2.inOut',
      },
      0
    );

    tl.to(
      cameraStateRef.current,
      {
        currentFOV: 48,
        duration: 1,
        ease: 'power2.inOut',
        onUpdate: () => {
          camera.fov = cameraStateRef.current.currentFOV;
          camera.updateProjectionMatrix();
        },
      },
      0
    );

    // Services section - Rotate around model
    tl.to(
      cameraStateRef.current.targetPos,
      {
        x: -10,
        y: 5,
        z: 10,
        duration: 1,
        ease: 'power2.inOut',
      },
      0.25
    );

    tl.to(
      cameraStateRef.current,
      {
        currentFOV: 46,
        duration: 1,
        ease: 'power2.inOut',
        onUpdate: () => {
          camera.fov = cameraStateRef.current.currentFOV;
          camera.updateProjectionMatrix();
        },
      },
      0.25
    );

    // Portfolio section - Zoom and shift perspective
    tl.to(
      cameraStateRef.current.targetPos,
      {
        x: 8,
        y: 3,
        z: -10,
        duration: 1,
        ease: 'power2.inOut',
      },
      0.5
    );

    tl.to(
      cameraStateRef.current,
      {
        currentFOV: 50,
        duration: 1,
        ease: 'power2.inOut',
        onUpdate: () => {
          camera.fov = cameraStateRef.current.currentFOV;
          camera.updateProjectionMatrix();
        },
      },
      0.5
    );

    // Contact section - Pull back and elevate
    tl.to(
      cameraStateRef.current.targetPos,
      {
        x: 0,
        y: 8,
        z: 15,
        duration: 1,
        ease: 'power2.inOut',
      },
      0.75
    );

    tl.to(
      cameraStateRef.current,
      {
        currentFOV: 42,
        duration: 1,
        ease: 'power2.inOut',
        onUpdate: () => {
          camera.fov = cameraStateRef.current.currentFOV;
          camera.updateProjectionMatrix();
        },
      },
      0.75
    );

    // Adjust lighting intensity based on scroll
    const lights = scene.children.filter(
      (child) => child instanceof THREE.Light
    ) as THREE.Light[];

    if (lights.length > 0) {
      // Hero - Bright
      tl.to(
        lights.map(() => ({ intensity: 2 })),
        {
          intensity: 2,
          duration: 1,
          ease: 'power2.inOut',
          onUpdate: function () {
            lights.forEach((light) => {
              light.intensity = (this.targets()[0] as any).intensity;
            });
          },
        },
        0
      );

      // Services - Softer
      tl.to(
        lights.map(() => ({ intensity: 1.5 })),
        {
          intensity: 1.5,
          duration: 1,
          ease: 'power2.inOut',
          onUpdate: function () {
            lights.forEach((light) => {
              light.intensity = (this.targets()[0] as any).intensity;
            });
          },
        },
        0.25
      );

      // Portfolio - Balanced
      tl.to(
        lights.map(() => ({ intensity: 1.8 })),
        {
          intensity: 1.8,
          duration: 1,
          ease: 'power2.inOut',
          onUpdate: function () {
            lights.forEach((light) => {
              light.intensity = (this.targets()[0] as any).intensity;
            });
          },
        },
        0.5
      );

      // Contact - Warm
      tl.to(
        lights.map(() => ({ intensity: 1.6 })),
        {
          intensity: 1.6,
          duration: 1,
          ease: 'power2.inOut',
          onUpdate: function () {
            lights.forEach((light) => {
              light.intensity = (this.targets()[0] as any).intensity;
            });
          },
        },
        0.75
      );
    }

    // Section-specific triggers for particle effects
    const sections = [
      { selector: '#hero3d', name: 'hero' },
      { selector: '.services-section', name: 'services' },
      { selector: '.portfolio-section', name: 'portfolio' },
      { selector: '.contact-section', name: 'contact' },
    ];

      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section.selector,
          start: 'top center',
          end: 'bottom center',
          invalidateOnRefresh: true,
          onEnter: () => updateSectionEffects(section.name, scene),
          onEnterBack: () => updateSectionEffects(section.name, scene),
        });
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
  }, [camera, scene]);

    // Update camera position every frame
  useFrame(() => {
    const perspCamera = camera as THREE.PerspectiveCamera;
    perspCamera.position.lerp(cameraStateRef.current.targetPos, 0.05);
    perspCamera.lookAt(cameraStateRef.current.targetLookAt);
  });

  return null;
}

/**
 * Update scene effects based on current section
 */
function updateSectionEffects(section: string, scene: THREE.Scene) {
  const particles = scene.children.find(
    (child) => child instanceof THREE.Points
  ) as THREE.Points | undefined;

  if (!particles || !particles.material) return;

  const material = particles.material as THREE.PointsMaterial;

  const opacityMap: Record<string, number> = {
    hero: 0.4,
    services: 0.2,
    portfolio: 0.3,
    contact: 0.15,
  };

  gsap.to(material, {
    opacity: opacityMap[section] || 0.3,
    duration: 0.8,
    ease: 'power2.inOut',
  });
}

export default CinematicScrollCamera;
