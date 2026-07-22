import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function SoftSphere() {
  const sphereRef = useRef()
  
  // Use useMemo for materials to prevent re-renders
  const material = useMemo(() => (
    <MeshDistortMaterial
      color="#B89B72"
      speed={1.5}
      distort={0.3}
      radius={1}
      roughness={0.4}
      metalness={0.1}
      transparent
      opacity={0.4}
    />
  ), [])

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <Sphere ref={sphereRef} args={[1, 16, 16]} scale={2.5}>
      {material}
    </Sphere>
  )
}

export default function Contact3D() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]} // Optimized for mobile
        gl={{ antialias: false, powerPreference: 'low-power' }} // High efficiency
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <SoftSphere />
      </Canvas>
    </div>
  )
}
