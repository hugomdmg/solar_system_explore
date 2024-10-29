import React, { useRef } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import * as THREE from 'three'

const Planet = ({ planet, position, size, onClick, rotation }) => {
    const texture = useLoader(THREE.TextureLoader, '/maps/' + planet)
    const meshRef = useRef()

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += rotation
        }
    })

    return (
        <mesh ref={meshRef} position={position} onClick={onClick}>
            <sphereGeometry args={[size, 128, 128]} />
            <meshStandardMaterial map={texture} />
        </mesh>
    )
}

function Scene() {
    const cameraRef = useRef()

    const handleSphereClick = (position) => {
            cameraRef.current.position.set(position[0]+2, position[1], position[2])
            cameraRef.current.lookAt(position[0], position[1], position[2])
    }

    return (
        <Canvas style={{ width: '100vw', height: '100vh' }}
            camera={{ position: [2, 0, 0], fov: 30 }} 
            onCreated={({ camera }) => (cameraRef.current = camera)}
        >
            <Planet 
                onClick={() => handleSphereClick([0, 0, 0])} 
                planet='earth.jpg' 
                position={[0, 0, 0]} 
                size={0.5}
                rotation={0.001}
            />
            <Planet 
                onClick={() => handleSphereClick([5, 0, 0])} 
                planet='moon.jpg' 
                position={[5, 0, 0]} 
                size={0.1}
                rotation={0}

            />
            <ambientLight intensity={0.1} />
            <directionalLight
                position={[5, 5, 5]}
                intensity={4}
            />
            <Environment files="/maps/stars.jpg" background={true} />
            <OrbitControls enableZoom={true} />
        </Canvas>
    )
}


export default Scene
