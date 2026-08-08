/**
 * ScrollTransitionController.tsx - Smooth Section Transitions with Timing Sync
 * 
 * Features:
 * - Seamless transitions between section camera sequences
 * - Synchronized timing with scroll progress
 * - Easing curves for natural motion
 * - Section boundary detection and smooth interpolation
 * - Parallax effect coordination
 */

import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

interface TransitionState {
  currentSection: string;
  nextSection: string;
  transitionProgress: number;
  scrollProgress: number;
}

export function ScrollTransitionController() {
  const { camera: baseCamera, scene } = useThree();
  const camera = baseCamera as THREE.PerspectiveCamera;

  const stateRef = useRef<TransitionState>({
    currentSection: 'hero',
    nextSection: 'services',
    transitionProgress: 0,
    scrollProgress: 0,
  });

  const cameraStateRef = useRef({
    position: new THREE.Vector3(0, 2, 10),
    targetPosition: new THREE.Vector3(0, 2, 10),
    lookAt: new THREE.Vector3(0, 0, 0),
    targetLookAt: new THREE.Vector3(0, 0, 0),
    fov: 50,
    targetFov: 50,
  });

  // Define section boundaries and camera targets
  const sectionTransitions = [
    {
      section: 'hero',
      trigger: '#hero3d',
      startScroll: 0,
      endScroll: 0.25,
      cameraStart: { pos: [0, 2, 10] as [number, number, number], fov: 50 },
      cameraEnd: { pos: [12, 4, 8] as [number, number, number], fov: 48 },
      easing: 'power2.inOut',
    },
    {
      section: 'services',
      trigger: '.services-section',
      startScroll: 0.2,
      endScroll: 0.45,
      cameraStart: { pos: [12, 4, 8] as [number, number, number], fov: 48 },
      cameraEnd: { pos: [-10, 5, 10] as [number, number, number], fov: 46 },
      easing: 'power2.inOut',
    },
    {
      section: 'portfolio',
      trigger: '.portfolio-section',
      startScroll: 0.4,
      endScroll: 0.65,
      cameraStart: { pos: [-10, 5, 10] as [number, number, number], fov: 46 },
      cameraEnd: { pos: [8, 3, -10] as [number, number, number], fov: 50 },
      easing: 'power2.inOut',
    },
    {
      section: 'contact',
      trigger: '.contact-section',
      startScroll: 0.6,
      endScroll: 1,
      cameraStart: { pos: [8, 3, -10] as [number, number, number], fov: 50 },
      cameraEnd: { pos: [0, 8, 15] as [number, number, number], fov: 42 },
      easing: 'power2.inOut',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create main scroll trigger
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          stateRef.current.scrollProgress = self.progress;

          // Determine current section based on scroll progress
          const progress = self.progress;
          let currentSection = 'hero';

          sectionTransitions.forEach((transition) => {
            if (progress >= transition.startScroll && progress < transition.endScroll) {
              currentSection = transition.section;
            }
          });

          stateRef.current.currentSection = currentSection;

          // Calculate transition progress within current section
          const currentTransition = sectionTransitions.find((t) => t.section === currentSection);

          if (currentTransition) {
            const sectionProgress =
              (progress - currentTransition.startScroll) / (currentTransition.endScroll - currentTransition.startScroll);

            stateRef.current.transitionProgress = Math.max(0, Math.min(1, sectionProgress));

            // Interpolate camera position
            const startPos = currentTransition.cameraStart.pos;
            const endPos = currentTransition.cameraEnd.pos;

            cameraStateRef.current.targetPosition.set(
              gsap.utils.interpolate(startPos[0], endPos[0], sectionProgress),
              gsap.utils.interpolate(startPos[1], endPos[1], sectionProgress),
              gsap.utils.interpolate(startPos[2], endPos[2], sectionProgress)
            );

            // Interpolate FOV
            cameraStateRef.current.targetFov = gsap.utils.interpolate(
              currentTransition.cameraStart.fov,
              currentTransition.cameraEnd.fov,
              sectionProgress
            );
          }
        },
      });

      // Create section entry triggers for visual effects
      sectionTransitions.forEach((transition) => {
        ScrollTrigger.create({
          trigger: transition.trigger,
          start: 'top center',
          end: 'bottom center',
          invalidateOnRefresh: true,
          onEnter: () => onSectionTransition(transition.section, scene),
          onEnterBack: () => onSectionTransition(transition.section, scene),
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
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [scene]);

  // Update camera position every frame with smooth easing
  useFrame(() => {
    const perspCamera = camera as THREE.PerspectiveCamera;

    // Smooth position interpolation with easing
    perspCamera.position.lerp(cameraStateRef.current.targetPosition, 0.1);

    // Smooth FOV interpolation
    perspCamera.fov += (cameraStateRef.current.targetFov - perspCamera.fov) * 0.08;
    perspCamera.updateProjectionMatrix();

    // Smooth look-at
    perspCamera.lookAt(cameraStateRef.current.targetLookAt);
  });

  return null;
}

/**
 * Handle section transition effects
 */
function onSectionTransition(section: string, scene: THREE.Scene) {
  const particles = scene.children.find(
    (child) => child instanceof THREE.Points
  ) as THREE.Points | undefined;

  if (!particles || !particles.material) return;

  const material = particles.material as THREE.PointsMaterial;

  // Adjust particle opacity based on section
  const opacityMap: Record<string, number> = {
    hero: 0.4,
    services: 0.25,
    portfolio: 0.3,
    contact: 0.15,
  };

  gsap.to(material, {
    opacity: opacityMap[section] || 0.3,
    duration: 0.8,
    ease: 'power2.inOut',
  });

  // Adjust lighting based on section
  const lights = scene.children.filter(
    (child) => child instanceof THREE.Light
  ) as THREE.Light[];

  const intensityMap: Record<string, number> = {
    hero: 2,
    services: 1.6,
    portfolio: 1.8,
    contact: 1.5,
  };

  lights.forEach((light) => {
    gsap.to(light, {
      intensity: intensityMap[section] || 1.6,
      duration: 0.8,
      ease: 'power2.inOut',
    });
  });
}

export default ScrollTransitionController;
