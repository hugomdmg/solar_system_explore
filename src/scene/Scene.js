import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Planet from './Planet'
import planets from '../infrastructure/data_planets'
import Gravity from '../infrastructure/gravity'

let G = 6.674 * Math.pow(10, -11) / Math.pow(10, 4)

planets.forEach((planet) => {
    planet.mass = planet.mass / Math.pow(10, 33)
    planet.position.x = planet.position.x / Math.pow(10, 11)
    planet.radius = planet.radius / Math.pow(10, 11)
    if (planet.name != 'sun') {
        planet.velocity.vz = Math.sqrt(G * planets[0].mass / planet.position.x) / 2.85
    }
    if (planet.name == 'moon') {
        planet.velocity.vz = 1.01 * Math.sqrt(G * planets[0].mass / planet.position.x) / 2.85
    }
})

function Scene() {
    const { camera } = useThree()
    const orbitControlsRef = useRef()
    const [bodies, setBodies] = useState(planets)
    const [selectedPlanet, setSelectedPlanet] = useState(bodies[0])
    let [t, setT] = useState(200000)
    const gravity = new Gravity(G)

    //===================

    let shipData = {
        name: 'ship',
        radius: 0.5,
        mass: 0,
        position: {
            x: 1,
            y: 0,
            z: 1
        },
        velocity: {
            vx: 0.001,
            vy: 0,
            vz: 0
        },
        rotation: 0.0001
    }

    const [ship, setShip] = useState(shipData)

    function actionShip(event){
        switch (event.key) {
            case 'a':
                ship.position.x += 0.1
                setShip(ship)
                break
            case 'd':
                ship.position.x -= 0.1
                setShip(ship)
                break
            default:
                break
        }
    }

    function moveShip(){
        ship.position.x += ship.velocity.vx
        ship.position.y += ship.velocity.vy
        ship.position.z += ship.velocity.vz
        setShip(ship)

    }




    //===================





    const handlePlanetClick = (planet) => {
        setSelectedPlanet(planet)
    }

    const handleKeyDown = useCallback((event) => {
        actionShip(event)
        switch (event.key) {
            case 'x':
                if (t <= 500000) {
                    setT((prevT) => prevT + 100000)
                } else {
                    setT((prevT) => prevT + 500000)
                }
                break
            case 'z':
                if (t <= 500000) {
                    setT((prevT) => prevT - 100000)
                } else {
                    setT((prevT) => prevT - 500000)
                }
                break
            default:
                break
        }
    }, [])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    useFrame(() => {
        moveShip()
        setBodies((prevPlanets) => gravity.gravitationalField(prevPlanets, t))
        bodies.forEach((body) => {
            if (body.name == selectedPlanet.name) {
                const { x, y, z } = body.position
                orbitControlsRef.current.target.set(x, y, z)
                camera.lookAt(x, y, z)
                orbitControlsRef.current.update()
            }
        })
    })

    return (
        <>
            <mesh onClick={() => { }} position={[ship.position.x, ship.position.y, ship.position.z]}>
                <sphereGeometry args={[0.01, 32, 32]} />
                <meshStandardMaterial
                    color="blue"
                    emissive="white"
                    transparent
                    opacity={0.5}
                    emissiveIntensity={10}
                />
            </mesh>
            {bodies.map((planet, index) => (
                <Planet
                    key={index}
                    planet={planet}
                    onClick={() => handlePlanetClick(planet)}
                />
            ))}
            <ambientLight intensity={0.1} />
            <pointLight position={[0, 0, 0]} intensity={10} decay={1} />
            <Environment files="/maps/stars.jpg" background />
            <OrbitControls
                ref={orbitControlsRef}
                enableZoom={true}
                enableRotate={true}
                enablePan={false}
                maxDistance={50}
                minDistance={0.00001}
            />
        </>
    )
}

export default Scene
