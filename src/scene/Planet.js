import { useLoader, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import React, { useRef } from 'react'

const Planet = ({ planet, position, size, onClick, rotation }) => {
    const texture = useLoader(THREE.TextureLoader, '/maps/' + planet + '.jpg')
    const meshRef = useRef()
    const light = planet == 'sun' ? 2 : 0

    useFrame(() => {
        meshRef.current.rotation.y += rotation
        if (meshRef.current && planet == 'moon.jpg') {
            // meshRef.current.position.x += velocity.x
            // meshRef.current.position.y += velocity.y
            // meshRef.current.position.z += velocity.z
        }
    })

    return (
        <mesh ref={meshRef} position={[position.x, position.y, position.z]} onClick={onClick}>
            <sphereGeometry args={[size, 128, 128]} />
            <meshStandardMaterial map={texture}
                color='white'
                emissive='white'
                emissiveIntensity={light}
            />
        </mesh>
    )
}

export default Planet