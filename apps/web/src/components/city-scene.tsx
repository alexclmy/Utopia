"use client";

import { ruleForDecision } from "@utopia/city-rules";
import type { Decision } from "@utopia/domain";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Group, Mesh } from "three";

const decisionPositions: [number, number, number][] = [
  [-18, 0, -10],
  [-5, 0, -18],
  [10, 0, -12],
  [22, 0, 2],
  [-22, 0, 12],
  [-3, 0, 14],
  [13, 0, 14],
  [0, 0, 0]
];

type CitySceneProps = {
  decisions: Decision[];
  activeDecisionId?: string;
  onSelectDecision: (decision: Decision) => void;
};

function Building({ decision, index, active, onSelect }: { decision: Decision; index: number; active: boolean; onSelect: () => void }) {
  const meshRef = useRef<Mesh>(null);
  const markerRef = useRef<Group>(null);
  const rule = ruleForDecision(decision);
  const [x, , z] = decisionPositions[index % decisionPositions.length];
  const height = 4 + ((index * 7) % 13);
  const width = 4 + (index % 3);
  const depth = 4 + ((index + 1) % 4);

  useFrame(({ clock }) => {
    if (markerRef.current) {
      markerRef.current.position.y = height + 2 + Math.sin(clock.elapsedTime * 2 + index) * 0.3;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = active ? Math.sin(clock.elapsedTime * 1.3) * 0.04 : 0;
    }
  });

  return (
    <group position={[x, 0, z]}>
      <mesh ref={meshRef} position={[0, height / 2, 0]} castShadow receiveShadow onClick={(event) => { event.stopPropagation(); onSelect(); }}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={active ? "#d6c9a8" : "#eadfca"} roughness={0.78} />
      </mesh>
      {decision.cityEffectKey === "green_roofs" || decision.cityEffectKey === "green_floor" ? (
        <mesh position={[0, height + 0.18, 0]} castShadow>
          <boxGeometry args={[width * 0.92, 0.36, depth * 0.92]} />
          <meshStandardMaterial color="#7fa86a" roughness={0.88} />
        </mesh>
      ) : null}
      {decision.cityEffectKey === "covered_arcades" ? (
        <mesh position={[0, 1.45, depth / 2 + 1.1]} castShadow>
          <boxGeometry args={[width + 1.4, 2.3, 1.2]} />
          <meshStandardMaterial color="#d6c9a8" roughness={0.84} />
        </mesh>
      ) : null}
      <group ref={markerRef} position={[0, height + 2, 0]}>
        <Float speed={2.4} rotationIntensity={0.12} floatIntensity={0.45}>
          <mesh onClick={(event) => { event.stopPropagation(); onSelect(); }}>
            <sphereGeometry args={[active ? 0.55 : 0.42, 24, 24]} />
            <meshStandardMaterial color={rule?.visualCue.color ?? "#1b5e43"} emissive={rule?.visualCue.color ?? "#1b5e43"} emissiveIntensity={active ? 0.9 : 0.45} />
          </mesh>
          {active ? (
            <Html center distanceFactor={13} position={[0, 1.15, 0]}>
              <div className="rounded-full bg-[#fbf9f2]/95 px-3 py-1 text-xs font-extrabold text-[#1b5e43] shadow-soft">
                {rule?.visualCue.icon} {decision.sourceCity}
              </div>
            </Html>
          ) : null}
        </Float>
      </group>
    </group>
  );
}

function Tree({ x, z, scale = 1 }: { x: number; z: number; scale?: number }) {
  return (
    <group position={[x, 0, z]} scale={scale}>
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.28, 2, 8]} />
        <meshStandardMaterial color="#8a6a2a" />
      </mesh>
      <mesh position={[0, 2.35, 0]} castShadow>
        <coneGeometry args={[1.05, 2.25, 9]} />
        <meshStandardMaterial color="#7fa86a" roughness={0.9} />
      </mesh>
    </group>
  );
}

function ProceduralCity({ decisions, activeDecisionId, onSelectDecision }: CitySceneProps) {
  const streets = useMemo(() => Array.from({ length: 7 }, (_, i) => (i - 3) * 9), []);

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[30, 45, 20]} intensity={1.8} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[90, 90]} />
        <meshStandardMaterial color="#e4e0cf" roughness={0.95} />
      </mesh>

      {streets.map((pos) => (
        <group key={`street-${pos}`}>
          <mesh position={[pos, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[2.25, 82]} />
            <meshStandardMaterial color="#cfc9bb" roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.014, pos]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[82, 2.25]} />
            <meshStandardMaterial color="#cfc9bb" roughness={0.9} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[7.3, 40]} />
        <meshStandardMaterial color="#a9c78c" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.4, 32]} />
        <meshStandardMaterial color="#9bc0c4" roughness={0.75} />
      </mesh>

      {decisions.map((decision, index) => (
        <Building
          key={decision.id}
          decision={decision}
          index={index}
          active={decision.id === activeDecisionId}
          onSelect={() => onSelectDecision(decision)}
        />
      ))}

      {[-28, -20, -12, 18, 27].map((x, i) => (
        <Tree key={`tree-a-${x}`} x={x} z={-29 + i * 9} scale={0.75 + i * 0.05} />
      ))}
      {[-25, -14, 16, 25].map((z, i) => (
        <Tree key={`tree-b-${z}`} x={30 - i * 8} z={z} scale={0.82} />
      ))}
    </>
  );
}

export function CityScene(props: CitySceneProps) {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,#d6e8d8_0%,#cfe7e4_38%,#f4f1e8_100%)]">
      <Canvas shadows dpr={[1, 2]} onPointerMissed={() => undefined}>
        <PerspectiveCamera makeDefault position={[35, 36, 42]} fov={45} />
        <ProceduralCity {...props} />
        <OrbitControls enableDamping minDistance={28} maxDistance={92} maxPolarAngle={Math.PI / 2.25} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 city-grid-mask opacity-30" />
    </div>
  );
}
