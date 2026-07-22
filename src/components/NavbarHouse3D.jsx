import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

function MiniVilla({ mouseRef, hovered }) {
  const groupRef = useRef(null)

  const concrete = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#E8E6E3',
        roughness: 0.85,
        metalness: 0.05,
      }),
    [],
  )
  const glass = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        roughness: 0.1,
        metalness: 0.05,
        transmission: 0.85,
        thickness: 0.35,
      }),
    [],
  )
  const wood = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#3A2E26',
        roughness: 0.75,
        metalness: 0.05,
      }),
    [],
  )

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const base = hovered ? 0.42 : 0.18
    groupRef.current.rotation.y += delta * base
    const mx = hovered ? mouseRef.current.x : 0
    const my = hovered ? mouseRef.current.y : 0
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, my * 0.35, 0.12)
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, -mx * 0.28, 0.12)
  })

  return (
    <group ref={groupRef} scale={[1.3, 1.3, 1.3]}>
      <mesh position={[0, 0.12, 0]} material={concrete} castShadow>
        <boxGeometry args={[0.55, 0.28, 0.42]} />
      </mesh>
      <mesh position={[0, 0.32, 0]} material={concrete} castShadow>
        <boxGeometry args={[0.42, 0.2, 0.32]} />
      </mesh>
      <mesh position={[0, 0.12, 0.22]} material={glass}>
        <boxGeometry args={[0.45, 0.22, 0.04]} />
      </mesh>
      <mesh position={[0, 0.02, 0]} material={wood} castShadow>
        <boxGeometry args={[0.58, 0.06, 0.44]} />
      </mesh>
    </group>
  )
}

export default function NavbarHouse3D() {
  const wrapRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const move = (e) => {
      const r = el.getBoundingClientRect()
      mouseRef.current = {
        x: ((e.clientX - r.left) / r.width) * 2 - 1,
        y: -(((e.clientY - r.top) / r.height) * 2 - 1),
      }
    }
    el.addEventListener('pointermove', move)
    return () => el.removeEventListener('pointermove', move)
  }, [])

  return (
    <div
      ref={wrapRef}
      className="pointer-events-auto h-14 w-14 shrink-0 overflow-visible sm:h-16 sm:w-16"
      aria-hidden
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => {
        setHovered(false)
        mouseRef.current = { x: 0, y: 0 }
      }}
    >
      <Canvas
        camera={{ position: [0, 0.35, 1.35], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[2, 4, 3]} intensity={1.1} />
        <directionalLight position={[-2, 1, -2]} intensity={0.35} color="#B89B72" />
        <MiniVilla mouseRef={mouseRef} hovered={hovered} />
      </Canvas>
    </div>
  )
}
