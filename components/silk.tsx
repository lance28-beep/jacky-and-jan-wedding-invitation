"use client"

/* eslint-disable react/no-unknown-property */
import type React from "react"
import { forwardRef, useMemo, useRef, useLayoutEffect } from "react"
import dynamic from 'next/dynamic'
import { Color, type Mesh, type ShaderMaterial } from "three"
import type { IUniform } from "three"
import { Suspense } from 'react'

// Only import types from @react-three/fiber
import type { RootState } from "@react-three/fiber"

// Create a client-only wrapper component with no SSR
const ClientSilk = dynamic(() => import('./client-silk'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-burgundy/5 via-transparent to-wine/5" />
  )
})

type NormalizedRGB = [number, number, number]

const hexToNormalizedRGB = (hex: string): NormalizedRGB => {
  const clean = hex.replace("#", "")
  const r = Number.parseInt(clean.slice(0, 2), 16) / 255
  const g = Number.parseInt(clean.slice(2, 4), 16) / 255
  const b = Number.parseInt(clean.slice(4, 6), 16) / 255
  return [r, g, b]
}

interface UniformValue<T = number | Color> {
  value: T
}

interface SilkUniforms {
  uSpeed: UniformValue<number>
  uScale: UniformValue<number>
  uNoiseIntensity: UniformValue<number>
  uColor: UniformValue<Color>
  uRotation: UniformValue<number>
  uTime: UniformValue<number>
  [uniform: string]: IUniform
}

const vertexShader = `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vPosition = position;
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
varying vec2 vUv;
varying vec3 vPosition;

uniform float uTime;
uniform vec3  uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

const float e = 2.71828182845904523536;

float noise(vec2 texCoord) {
  float G = e;
  vec2  r = (G * sin(G * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  mat2  rot = mat2(c, -s, s, c);
  return rot * uv;
}

void main() {
  float rnd        = noise(gl_FragCoord.xy);
  vec2  uv         = rotateUvs(vUv * uScale, uRotation);
  vec2  tex        = uv * uScale;
  float tOffset    = uSpeed * uTime;

  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);

  float pattern = 0.6 +
                  0.4 * sin(5.0 * (tex.x + tex.y +
                                   cos(3.0 * tex.x + 5.0 * tex.y) +
                                   0.02 * tOffset) +
                           sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`

interface SilkPlaneProps {
  uniforms: SilkUniforms
}

const SilkPlane = forwardRef<Mesh, SilkPlaneProps>(function SilkPlane({ uniforms }, ref) {
  const { viewport } = useThree()

  useLayoutEffect(() => {
    const mesh = ref as React.MutableRefObject<Mesh | null>
    if (mesh.current) {
      mesh.current.scale.set(viewport.width, viewport.height, 1)
    }
  }, [ref, viewport])

  useFrame((_state: RootState, delta: number) => {
    const mesh = ref as React.MutableRefObject<Mesh | null>
    if (mesh.current) {
      const material = mesh.current.material as ShaderMaterial & {
        uniforms: SilkUniforms
      }
      material.uniforms.uTime.value += 0.1 * delta
    }
  })

  return (
    <mesh ref={ref}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />
    </mesh>
  )
})
SilkPlane.displayName = "SilkPlane"

export interface SilkProps {
  speed?: number
  scale?: number
  color?: string
  noiseIntensity?: number
  rotation?: number
}

const Silk: React.FC<SilkProps> = (props) => {
  return (
    <div className="w-full h-full relative overflow-hidden">
      <Suspense fallback={
        <div className="w-full h-full bg-gradient-to-br from-burgundy/5 via-transparent to-wine/5" />
      }>
        <ClientSilk {...props} />
      </Suspense>
    </div>
  )
}

export default Silk
