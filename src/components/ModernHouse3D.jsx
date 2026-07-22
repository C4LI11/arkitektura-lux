import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Stage } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'

function useMouseTilt() {
  const target = useRef({ x: 0, y: 0 })
  useEffect(() => {
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1
      target.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])
  return target
}

function MinimalVilla({ groupRef, scrollRef, mouseRef }) {
  const concrete = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: '#E8E6E3',
      roughness: 0.82,
      metalness: 0.06,
    })
    m.transparent = true
    m.opacity = 1
    return m
  }, [])

  const glass = useMemo(() => {
    const m = new THREE.MeshPhysicalMaterial({
      color: '#ffffff',
      metalness: 0.02,
      roughness: 0.08,
      transmission: 0.9,
      thickness: 0.45,
      transparent: true,
      opacity: 1,
    })
    return m
  }, [])

  const wood = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: '#3A2E26',
      roughness: 0.72,
      metalness: 0.05,
    })
    m.transparent = true
    m.opacity = 1
    return m
  }, [])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    groupRef.current.rotation.y += delta * 0.16

    const mx = mouseRef.current.x
    const my = mouseRef.current.y
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, my * 0.2, 0.07)
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -mx * 0.16, 0.07)

    const vh = typeof window !== 'undefined' ? window.innerHeight : 800
    const p = Math.min(1, scrollRef.current / (vh * 0.88))
    const scaleBoost = 1 + p * 0.26
    groupRef.current.scale.setScalar(scaleBoost)

    const fade = 1 - p * 0.82
    groupRef.current.traverse((obj) => {
      if (obj.isMesh && obj.material) {
        const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
        mats.forEach((mat) => {
          mat.transparent = true
          mat.opacity = fade
        })
      }
    })
  })

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      <mesh position={[0, 0.55, 0]} material={concrete} castShadow receiveShadow>
        <boxGeometry args={[2.4, 1.15, 2]} />
      </mesh>
      <mesh position={[0, 1.38, 0]} material={concrete} castShadow receiveShadow>
        <boxGeometry args={[1.9, 0.75, 1.5]} />
      </mesh>
      <mesh position={[0, 0.55, 1.01]} material={glass} castShadow>
        <boxGeometry args={[2, 0.95, 0.06]} />
      </mesh>
      <mesh position={[1.21, 0.55, 0]} rotation={[0, Math.PI / 2, 0]} material={glass} castShadow>
        <boxGeometry args={[1.6, 0.85, 0.05]} />
      </mesh>
      <mesh position={[0, 0.1, 0]} material={wood} castShadow receiveShadow>
        <boxGeometry args={[2.6, 0.18, 2.15]} />
      </mesh>
      <mesh position={[0, 2.05, -0.45]} material={wood} castShadow>
        <boxGeometry args={[0.9, 0.08, 0.9]} />
      </mesh>
    </group>
  )
}

function SceneContent({ scrollRef }) {
  const groupRef = useRef(null)
  const mouseRef = useMouseTilt()
  return <MinimalVilla groupRef={groupRef} scrollRef={scrollRef} mouseRef={mouseRef} />
}

export default function ModernHouse3D({ className = '' }) {
  const scrollRef = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`relative h-[min(52vh,420px)] w-full min-h-[220px] sm:h-[min(56vh,460px)] lg:h-[min(68vh,520px)] lg:max-w-none ${className}`}
    >
      <Canvas
        className="h-full w-full touch-none"
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 1.1, 6.2]} fov={42} near={0.1} far={100} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[6, 10, 8]} intensity={1.05} castShadow />
        <directionalLight position={[-5, 4, -4]} intensity={0.32} color="#B89B72" />

        <Suspense fallback={null}>
          <Stage
            environment="studio"
            intensity={0.55}
            shadows="contact"
            adjustCamera={1.12}
          >
            <SceneContent scrollRef={scrollRef} />
          </Stage>
        </Suspense>
      </Canvas>
    </div>
  )
}
