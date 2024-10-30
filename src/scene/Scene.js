import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Planet from './Planet'
import Orbit from './Orbit'
import planets from '../infrastructure/data_planets'

console.log(planets[0])


function Scene() {
    const cameraRef = useRef()

    const handleSphereClick = (position) => {
        cameraRef.current.position.set(position[0] + 2, position[1], position[2])
        cameraRef.current.lookAt(position[0], position[1], position[2])
    }

    return (
        <Canvas style={{ width: '100vw', height: '100vh' }}
            camera={{ position: [2, 0, 0], fov: 30 }}
            onCreated={({ camera }) => (cameraRef.current = camera)}
        >
            {planets.map((planet) => {
                return (
                    <Planet onClick={() => handleSphereClick([0, 0, 0])}
                        planet={planet.name}
                        position={planet.position}
                        size={planet.radius}
                        rotation={planet.rotation} />
                )
            })}

            <Orbit />
            <ambientLight intensity={0.1} />
            <pointLight
                position={[0, 0, 0]}
                intensity={100}
            />
            <Environment files="/maps/stars.jpg" background={true} />
            <OrbitControls enableZoom={true} />
        </Canvas>
    )
}


export default Scene
