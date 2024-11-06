import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import Planet from './Planet'
import planets from '../infrastructure/data_planets'
import Gravity from '../infrastructure/gravity'

//=================
import { Line } from "@react-three/drei";
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import Ship from '../infrastructure/ship'
//-------------------


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


    const [explore, setExplore] = useState(false)
    const [ship, setShip] = useState(new Ship())
    const [scale, setScale] = useState(1)



    //===================





    const handlePlanetClick = (planet) => {
        setSelectedPlanet(planet)
    }

    const handleKeyDown = useCallback((event) => {
        ship.actionShip(event)
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
            case 't':
                setExplore(explore => !explore)
            default:
                break
        }
    }, [])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    useFrame(() => {
        if (explore) {
            setScale(100)
            ship.moveShip()
            camera.position.x = ship.view.x
            camera.position.y = ship.view.y
            camera.position.z = ship.view.z
            camera.lookAt(ship.position.x, ship.position.y, ship.position.z)
        }else{
            setScale(1)
        }
        setBodies((prevPlanets) => gravity.gravitationalField(prevPlanets, t))
        bodies.forEach((body) => {
            if (body.name == selectedPlanet.name && !explore) {
                const { x, y, z } = body.position
                orbitControlsRef.current.target.set(x, y, z)
                camera.lookAt(x, y, z)
                orbitControlsRef.current.update()
            }
        })
    })

    return (
        <>
            <Line points={ship.getPoints()} color="skyblue" lineWidth={2} />
            {bodies.map((planet, index) => (
                <Planet
                    key={index}
                    planet={planet}
                    scale = {scale}
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
