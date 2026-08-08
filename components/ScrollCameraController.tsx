/**
 * ScrollCameraController.tsx - Advanced GSAP Scroll-Triggered Camera System
 * 
 * Features:
 * - Section-specific camera sequences (Hero, Services, Portfolio, Contact)
 * - Cinematic orbits and zooms synchronized with scroll
 * - Smooth transitions between sections
 * - Dynamic lighting adjustments per section
 * - Performance-optimized scroll tracking
 */

import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

interface CameraSequence {
  section: string;
  trigger: string;
  startPos: [number, number, number];
  endPos: [number, number, number];
  lookAt: [number, number, number];
  fov?: number;
  duration?: number;
}

export function ScrollCameraController() {
  const { camera, scene } = useThree();
  const scrollProgressRef = useRef(0);
  const currentSectionRef = useRef('hero');

  // Define camera sequences for each section
  const cameraSequences: CameraSequence[] = [
    {
      section: 'hero',
      trigger: '#hero3d',
      startPos: [0, 2, 10],
      endPos: [12, 4, 8],
      lookAt: [0, 0, 0],
      fov: 50,
    },
    {
      section: 'services',
      trigger: '.services-section',
      startPos: [12, 4, 8],
      endPos: [-8, 6, 12],
      lookAt: [0, 0, 0],
      fov: 45,
    },
    {
      section: 'portfolio',
      trigger: '.portfolio-section',
      startPos: [-8, 6, 12],
      endPos: [10, 3, -8],
      lookAt: [0, 0, 0],
      fov: 48,
    },
    {
      section: 'contact',
      trigger: '.contact-section',
      startPos: [10, 3, -8],
      endPos: [0, 8, 15],
      lookAt: [0, 0, 0],
      fov: 42,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: 'body',
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
          },
        },
      });

      // Hero section - Cinematic orbit
      tl.to(
        camera.position,
        {
          x: 12,
          y: 4,
          z: 8,
          duration: 1,
          ease: 'power2.inOut',
        },
        0
      );

    // Services section - Rotate around model
    tl.to(
      camera.position,
      {
        x: -8,
        y: 6,
        z: 12,
        duration: 1,
        ease: 'power2.inOut',
      },
      0.25
    );

    // Portfolio section - Zoom in and shift
    tl.to(
      camera.position,
      {
        x: 10,
        y: 3,
        z: -8,
        duration: 1,
        ease: 'power2.inOut',
      },
      0.5
    );

    // Contact section - Pull back and elevate
    tl.to(
      camera.position,
      {
        x: 0,
        y: 8,
        z: 15,
        duration: 1,
        ease: 'power2.inOut',
      },
      0.75
    );

    // FOV animations for depth perception
    tl.to(
      camera,
      {
        fov: 45,
        duration: 1,
        ease: 'power2.inOut',
        onUpdate: () => {
          camera.updateProjectionMatrix();
        },
      },
      0
    );

    tl.to(
      camera,
      {
        fov: 48,
        duration: 1,
        ease: 'power2.inOut',
        onUpdate: () => {
          camera.updateProjectionMatrix();
        },
      },
      0.5
    );

    // Lighting adjustments per section
    const lights = scene.children.filter(
      (child) => child instanceof THREE.Light
    ) as THREE.Light[];

    // Hero lighting - Bright and energetic
    tl.to(
      lights.map((light) => light.intensity),
      {
        0: 2,
        duration: 1,
        ease: 'power2.inOut',
      },
      0
    );

    // Services lighting - Softer
    tl.to(
      lights.map((light) => light.intensity),
      {
        0: 1.5,
        duration: 1,
        ease: 'power2.inOut',
      },
      0.25
    );

    // Portfolio lighting - Balanced
    tl.to(
      lights.map((light) => light.intensity),
      {
        0: 1.8,
        duration: 1,
        ease: 'power2.inOut',
      },
      0.5
    );

    // Contact lighting - Warm and welcoming
    tl.to(
      lights.map((light) => light.intensity),
      {
        0: 1.6,
        duration: 1,
        ease: 'power2.inOut',
      },
      0.75
    );

      // Section-specific scroll triggers for detailed control
      cameraSequences.forEach((seq) => {
        ScrollTrigger.create({
          trigger: seq.trigger,
          start: 'top center',
          end: 'bottom center',
          scrub: false,
          invalidateOnRefresh: true,
          onEnter: () => {
            currentSectionRef.current = seq.section;
            updateSectionVisuals(seq.section, scene);
          },
          onEnterBack: () => {
            currentSectionRef.current = seq.section;
            updateSectionVisuals(seq.section, scene);
          },
        });
      });

      // Refresh triggers when the page fully loads to ensure correct offsets
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener('load', onLoad);

      // cleanup via ctx.revert below
      return () => {
        window.removeEventListener('load', onLoad);
      };
    });

    return () => {
      ctx.revert();
      // ensure all triggers killed
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [camera, scene]);

  return null;
}

/**
 * Update scene visuals based on current section
 */
function updateSectionVisuals(section: string, scene: THREE.Scene) {
  const particles = scene.children.find(
    (child) => child instanceof THREE.Points
  );

  if (!particles) return;

  switch (section) {
    case 'hero':
      // Bright cyan particles
      gsap.to((particles as THREE.Points).material, {
        opacity: 0.4,
        duration: 0.6,
      });
      break;
    case 'services':
      // Dimmer particles
      gsap.to((particles as THREE.Points).material, {
        opacity: 0.2,
        duration: 0.6,
      });
      break;
    case 'portfolio':
      // Medium opacity
      gsap.to((particles as THREE.Points).material, {
        opacity: 0.3,
        duration: 0.6,
      });
      break;
    case 'contact':
      // Subtle particles
      gsap.to((particles as THREE.Points).material, {
        opacity: 0.15,
        duration: 0.6,
      });
      break;
  }
}

export default ScrollCameraController;
