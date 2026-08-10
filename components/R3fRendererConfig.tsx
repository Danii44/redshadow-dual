"use client";

import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function R3fRendererConfig() {
  const { gl } = useThree();

  useEffect(() => {
    try {
      // Prefer PCFShadowMap instead of deprecated PCFSoftShadowMap
      if ((THREE as any).PCFShadowMap !== undefined) {
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = (THREE as any).PCFShadowMap;
      }
    } catch (e) {
      // ignore if unable to set
    }

    return () => {
      // leave defaults
    };
  }, [gl]);

  return null;
}
