import { useLoader, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import React, { useRef } from 'react'
import Orbit from './Orbit'
import Gravity from '../infrastructure/gravity'

const gravity = new Gravity()

const Planet = ({ planet, position, size, onClick, rotation }) => {

    const texture = useLoader(THREE.TextureLoader, '/maps/' + planet + '.jpg')
    const meshRef = useRef()
    const light = planet == 'sun' ? 10 : 0
    const radius = gravity.calculateDistance({ x: 0, y: 0, z: 0 }, position)

    useFrame(() => {
        meshRef.current.rotation.y += rotation
    })

    return (
        <>
            <mesh ref={meshRef} onClick={onClick} position={[position.x, position.y, position.z]}>
                <sphereGeometry args={[0.1, 32, 32]} />
                <meshStandardMaterial
                    color="blue"
                    emissive='white'
                    transparent
                    opacity={0.2}
                    emissiveIntensity={10}

                />
            </mesh>
            <mesh ref={meshRef} position={[position.x, position.y, position.z]} >
                <sphereGeometry args={[size, 128, 128]} />
                <meshStandardMaterial map={texture}
                    color='white'
                    emissive='white'
                    emissiveIntensity={light}
                    decay={1}
                />
            </mesh>
            <Orbit radius={radius} />
        </>
    )
}

export default Planet