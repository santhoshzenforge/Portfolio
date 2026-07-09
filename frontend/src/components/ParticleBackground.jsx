import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 3000 }) {
  const mesh = useRef()

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 60
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60
    }
    return pos
  }, [count])

  const colors = useMemo(() => {
    const cols = new Float32Array(count * 3)
    const c1 = new THREE.Color('#c9a86a')
    const c2 = new THREE.Color('#b8b8b8')
    const c3 = new THREE.Color('#f5f5f5')
    for (let i = 0; i < count; i++) {
      const choice = Math.random()
      const c = choice < 0.4 ? c1 : choice < 0.7 ? c2 : c3
      cols[i * 3] = c.r
      cols[i * 3 + 1] = c.g
      cols[i * 3 + 2] = c.b
    }
    return cols
  }, [count])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (mesh.current) {
      mesh.current.rotation.x = Math.sin(t * 0.02) * 0.15
      mesh.current.rotation.y = Math.sin(t * 0.04) * 0.25
      mesh.current.rotation.z = Math.sin(t * 0.015) * 0.08
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

export default function ParticleField() {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
      zIndex: 0, pointerEvents: 'none'
    }}>
      <Canvas camera={{ position: [0, 0, 18], fov: 70 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <Particles count={3000} />
      </Canvas>
    </div>
  )
}
