import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, Line } from '@react-three/drei'
import planets from '../infrastructure/data_planets'
import Planet from './Planet'
import Gravity from '../infrastructure/gravity'
import Ship from '../infrastructure/ship'
import Api from '../infrastructure/api'

let G = 6.674 * Math.pow(10, -11) / Math.pow(10, 4)

planets.forEach((planet) => {
    planet.mass = planet.mass / Math.pow(10, 33)
    planet.position.x = planet.position.x / Math.pow(10, 11)
    planet.radius = planet.radius / Math.pow(10, 11)
    if (planet.name !== 'sun') {
        planet.velocity.vz = Math.sqrt(G * planets[0].mass / planet.position.x) / 3
    }
})

function Scene() {
    const { camera } = useThree()
    const orbitControlsRef = useRef()
    const [bodies, setBodies] = useState(planets)
    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [simulationState, setSimulationState] = useState({
        selectedPlanet: bodies[0],
        t: 200000,
        explore: false,
        scale: 1
    })
    const gravity = new Gravity(G)
    const api = new Api()
    const [ships, setShips] = useState([]);

    //----------------------------

    const [userId, setUserId] = useState(Math.random())
    const [ship, setShip] = useState(() => {
        const newShip = new Ship()
        newShip.userId = Math.random()
        return newShip
    })
    const [shots, setShots] = useState([])

    const getApiShots = async () => {
        try {
            let result = await api.getShotsData()
            setShots(result.value);

        } catch (error) {
            console.error("Error:", error);
        }
    }

    const updateShips = async () => {
        try {
            const data = {
                userId: ship.userId,
                R: ship.R,
                position: ship.position
            }
            const result = await api.getShips(data);
            const updatedShips = result.value.map((shipData) => {
                let newShip = new Ship(shipData);
                newShip.setShipHorientation();
                return newShip;
            });

            setShips(updatedShips);

        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handlePlanetClick = (planet) => {
        setSimulationState((prev) => ({ ...prev, selectedPlanet: planet }))
    }

    const adjustTimeScale = (increase) => {
        setSimulationState((prev) => ({
            ...prev,
            t: prev.t <= 500000 ? prev.t + (increase ? 100000 : -100000) : prev.t + (increase ? 500000 : -500000)
        }))
    }

    const handleKeyDown = useCallback((event) => {
        ship.actionShip(event)
        switch (event.key) {
            case 'x': adjustTimeScale(true); break;
            case 'z': adjustTimeScale(false); break;
            case 't':
                setSimulationState((prev) => ({ ...prev, explore: !prev.explore }))
                break;
            case 'f':
                let newShot = {
                    userId: userId,
                    id: Math.random(),
                    position:ship.position,
                    velocity: {
                        x: ship.direction.x * 0.01 + ship.velocity.vx,
                        y: ship.direction.y * 0.01 + ship.velocity.vy,
                        z: ship.direction.z * 0.01 + ship.velocity.vz
                    }
                };
                api.getShots(newShot)
                break;
            default: break;
        }
    })

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown, ship])


    useFrame(() => {
        const now = Date.now();
        if (now - lastUpdate > 60) {
            updateShips();
            getApiShots()
            setLastUpdate(now);
        }

        const { explore, selectedPlanet, t, scale } = simulationState
        if (explore) {
            setSimulationState((prev) => ({ ...prev, scale: 100 }))
            ship.moveShip()
            camera.position.set(ship.view.x, ship.view.y, ship.view.z)
            camera.lookAt(ship.position.x, ship.position.y, ship.position.z)
        } else {
            setSimulationState((prev) => ({ ...prev, scale: 1 }))
        }

        setBodies((prevPlanets) => gravity.gravitationalField(prevPlanets, t))

        bodies.forEach((body) => {
            if (body.name === selectedPlanet.name && !explore) {
                const { x, y, z } = body.position
                orbitControlsRef.current.target.set(x, y, z)
                camera.lookAt(x, y, z)
                orbitControlsRef.current.update()
            }
        })
    })

    return (
        <>
            {
                shots.map((shot, index) => {
                    return (
                        <mesh key={index} position={[shot.position.x, shot.position.y, shot.position.z]}>
                            <sphereGeometry args={[0.001, 64, 64]} />
                            <meshStandardMaterial
                                color="red"
                                emissive="red"
                                opacity={1}
                            />
                        </mesh>
                    )
                })
            }
            {
                ships.map((n_ship, index) => {
                    if (n_ship.userId != ship.userId) {
                        return (
                            <Line key={index} points={n_ship.getPoints().slice(-100)} color="skyblue" lineWidth={2} />
                        )
                    }
                })
            }
            <Line points={ship.getPoints().slice(-100)} color="skyblue" lineWidth={2} />
            {bodies.map((planet, index) => (
                (
                    <Planet
                        render={camera.position.distanceTo(planet.position) < 0.6 || planet.name == 'sun'}
                        key={index}
                        planet={planet}
                        scale={simulationState.scale}
                        onClick={() => handlePlanetClick(planet)}
                    />
                )
            ))}
            <ambientLight intensity={0.04} />
            <pointLight position={[0, 0, 0]} intensity={10} decay={1} />
            <Environment files="/maps/stars.jpg" background />
            <OrbitControls
                ref={orbitControlsRef}
                maxDistance={simulationState.explore ? 500 : 50}
                minDistance={simulationState.explore ? 1 : 0.00001}
            />
        </>
    )
}

export default Scene
