/**
 * SectionCameraSequences.tsx - Section-Specific Camera Animation Sequences
 * 
 * Implements detailed camera choreography for each section:
 * - Hero: Dynamic orbit with zoom-in
 * - Services: Rotating perspective with depth changes
 * - Portfolio: Multiple viewpoint transitions
 * - Contact: Elevated wide-angle perspective
 */

import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

interface SectionConfig {
  selector: string;
  name: string;
  cameraPath: Array<{
    pos: [number, number, number];
    lookAt: [number, number, number];
    fov: number;
  }>;
  particleOpacity: number;
  lightIntensity: number;
}

export function SectionCameraSequences() {
  const { camera: baseCamera, scene } = useThree();
  const camera = baseCamera as THREE.PerspectiveCamera;
  const cameraStateRef = useRef({
    position: new THREE.Vector3(0, 2, 10),
    lookAtTarget: new THREE.Vector3(0, 0, 0),
    fov: 50,
  });

  // Define detailed camera sequences for each section
  const sectionConfigs: SectionConfig[] = [
    {
      selector: '#hero3d',
      name: 'hero',
      cameraPath: [
        {
          pos: [0, 2, 10],
          lookAt: [0, 0, 0],
          fov: 50,
        },
        {
          pos: [15, 5, 5],
          lookAt: [0, 0, 0],
          fov: 48,
        },
        {
          pos: [10, 3, 12],
          lookAt: [0, 0.5, 0],
          fov: 46,
        },
      ],
      particleOpacity: 0.4,
      lightIntensity: 2,
    },
    {
      selector: '.services-section',
      name: 'services',
      cameraPath: [
        {
          pos: [10, 3, 12],
          lookAt: [0, 0.5, 0],
          fov: 46,
        },
        {
          pos: [-12, 6, 8],
          lookAt: [0, 0, 0],
          fov: 45,
        },
        {
          pos: [-8, 4, -10],
          lookAt: [0, 0, 0],
          fov: 47,
        },
      ],
      particleOpacity: 0.25,
      lightIntensity: 1.6,
    },
    {
      selector: '.portfolio-section',
      name: 'portfolio',
      cameraPath: [
        {
          pos: [-8, 4, -10],
          lookAt: [0, 0, 0],
          fov: 47,
        },
        {
          pos: [12, 2, -8],
          lookAt: [0, 0, 0],
          fov: 49,
        },
        {
          pos: [6, 5, 10],
          lookAt: [0, 0, 0],
          fov: 48,
        },
      ],
      particleOpacity: 0.3,
      lightIntensity: 1.8,
    },
    {
      selector: '.contact-section',
      name: 'contact',
      cameraPath: [
        {
          pos: [6, 5, 10],
          lookAt: [0, 0, 0],
          fov: 48,
        },
        {
          pos: [0, 10, 16],
          lookAt: [0, 0, 0],
          fov: 42,
        },
        {
          pos: [0, 12, 18],
          lookAt: [0, 0, 0],
          fov: 40,
        },
      ],
      particleOpacity: 0.15,
      lightIntensity: 1.5,
    },
  ];

  useEffect(() => {
    // Create scroll timeline with section-specific sequences
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    });

    // Animate through all sections
    sectionConfigs.forEach((section, sectionIndex) => {
      const startTime = sectionIndex * 0.25;

      // Animate through camera path points within section
      section.cameraPath.forEach((point, pointIndex) => {
        if (pointIndex === 0) return; // Skip first point (already set)

        const pointTime = startTime + (pointIndex * 0.08) / section.cameraPath.length;

        // Position animation
        tl.to(
          cameraStateRef.current.position,
          {
            x: point.pos[0],
            y: point.pos[1],
            z: point.pos[2],
            duration: 0.15,
            ease: 'power2.inOut',
          },
          pointTime
        );

        // Look-at target animation
        tl.to(
          cameraStateRef.current.lookAtTarget,
          {
            x: point.lookAt[0],
            y: point.lookAt[1],
            z: point.lookAt[2],
            duration: 0.15,
            ease: 'power2.inOut',
          },
          pointTime
        );

        // FOV animation
        tl.to(
          cameraStateRef.current,
          {
            fov: point.fov,
            duration: 0.15,
            ease: 'power2.inOut',
            onUpdate: () => {
              camera.fov = cameraStateRef.current.fov;
              camera.updateProjectionMatrix();
            },
          },
          pointTime
        );
      });

      // Animate lighting for section
      const lights = scene.children.filter(
        (child) => child instanceof THREE.Light
      ) as THREE.Light[];

      if (lights.length > 0) {
        tl.to(
          { intensity: section.lightIntensity },
          {
            intensity: section.lightIntensity,
            duration: 0.2,
            ease: 'power2.inOut',
            onUpdate: function () {
              lights.forEach((light) => {
                light.intensity = (this as any).intensity;
              });
            },
          },
          startTime
        );
      }

      // Animate particle opacity for section
      const particles = scene.children.find(
        (child) => child instanceof THREE.Points
      ) as THREE.Points | undefined;

      if (particles && particles.material) {
        const material = particles.material as THREE.PointsMaterial;
        tl.to(
          material,
          {
            opacity: section.particleOpacity,
            duration: 0.2,
            ease: 'power2.inOut',
          },
          startTime
        );
      }
    });

    // Create section entry triggers for visual feedback
    sectionConfigs.forEach((section) => {
      ScrollTrigger.create({
        trigger: section.selector,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => onSectionEnter(section, scene),
        onEnterBack: () => onSectionEnter(section, scene),
      });
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [camera, scene]);

  // Update camera every frame with smooth interpolation
  useFrame(() => {
    const perspCamera = camera as THREE.PerspectiveCamera;

    // Smooth position interpolation
    perspCamera.position.lerp(cameraStateRef.current.position, 0.08);

    // Smooth look-at interpolation
    perspCamera.lookAt(cameraStateRef.current.lookAtTarget);
  });

  return null;
}

/**
 * Handle section entry animations and effects
 */
function onSectionEnter(section: SectionConfig, scene: THREE.Scene) {
  // Add any section-specific visual effects here
  const particles = scene.children.find(
    (child) => child instanceof THREE.Points
  ) as THREE.Points | undefined;

  if (particles) {
    gsap.to(particles.rotation, {
      z: particles.rotation.z + Math.PI * 2,
      duration: 2,
      ease: 'power1.inOut',
    });
  }
}

export default SectionCameraSequences;
