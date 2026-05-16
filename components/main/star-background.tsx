"use client";

import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import type { ComponentPropsWithoutRef } from "react";
import * as random from "maath/random";
import { useState, useRef, Suspense } from "react";
import type { Points as PointsType } from "three";

type StarBackgroundProps = ComponentPropsWithoutRef<typeof Points>;

export const StarBackground = (props: StarBackgroundProps) => {
  const ref = useRef<PointsType | null>(null);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.2 }),
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <Points
      ref={ref}
      stride={3}
      positions={new Float32Array(sphere)}
      rotation={[0, 0, Math.PI / 4]}
      frustumCulled
      {...props}
    >
      <PointMaterial
        transparent
        color="#fff"
        size={0.002}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
};

export const StarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 -z-10">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>
);
