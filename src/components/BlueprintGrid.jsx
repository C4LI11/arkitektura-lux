import { Canvas, useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function GridLines() {
  const linesRef = useRef()
  
  // Use useMemo to avoid re-calculating on every render
  const points = useMemo(() => {
    const size = 50
    const divisions = 40
    const grid = []
    const step = size / divisions
    const halfSize = size / 2

    // Create horizontal and vertical lines for a blueprint grid
    for (let i = 0; i <= divisions; i++) {
      const pos = i * step - halfSize
      // Horizontal
      grid.push(new THREE.Vector3(-halfSize, 0, pos))
      grid.push(new THREE.Vector3(halfSize, 0, pos))
      // Vertical
      grid.push(new THREE.Vector3(pos, 0, -halfSize))
      grid.push(new THREE.Vector3(pos, 0, halfSize))
    }
    return grid
  }, [])

  useFrame((state) => {
    if (linesRef.current) {
      // Very slow, subtle rotation and tilt
      linesRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1
      linesRef.current.rotation.x = -Math.PI / 4 + Math.cos(state.clock.getElapsedTime() * 0.15) * 0.05
    }
  })

  return (
    <group ref={linesRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flatMap(v => [v.x, v.y, v.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#333333" transparent opacity={0.3} linewidth={1} />
      </lineSegments>
    </group>
  )
}

export default function BlueprintGrid() {
  return (
    <div className="absolute inset-0 z-0 bg-[#1a1a1a] pointer-events-none">
      <Canvas
        camera={{ position: [0, 10, 20], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <GridLines />
      </Canvas>
    </div>
  )
}
