import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { useRef, useMemo, Suspense, useState, useEffect } from 'react'
import { MathUtils } from 'three'

function LightParticleGrid({ mouseRef }) {
  const pointsRef = useRef()
  
  // Minimal particles for maximum performance
  const count = 600
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = t * 0.03
    
    // Smooth mouse follow
    const targetX = mouseRef.current.x * 0.3
    const targetY = mouseRef.current.y * 0.3
    pointsRef.current.position.x = MathUtils.lerp(pointsRef.current.position.x, targetX, 0.02)
    pointsRef.current.position.y = MathUtils.lerp(pointsRef.current.position.y, targetY, 0.02)
  })

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.025}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.2}
      />
    </Points>
  )
}

export default function ArchWireframeBG({ mouseRef }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Static Mobile Fallback: High-end CSS Gradient with Glassmorphism
  if (isMobile) {
    return (
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1a1a1a_0%,#000000_100%)] opacity-60" />
        <div className="absolute inset-0 backdrop-blur-[100px]" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 z-0 bg-black">
      <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
        <Canvas
          gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 15], fov: 45 }}
        >
          <LightParticleGrid mouseRef={mouseRef} />
        </Canvas>
      </Suspense>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
    </div>
  )
}
