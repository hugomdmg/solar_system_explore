import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Planet from './Planet';
import planets from '../infrastructure/data_planets';
import Gravity from '../infrastructure/gravity';


function Scene() {
    const { camera } = useThree();
    const orbitControlsRef = useRef();
    const [bodies, setBodies] = useState(planets);
    const [selectedPlanet, setSelectedPlanet] = useState(bodies[0]);
    const gravity = new Gravity(0.001);
    
    const handlePlanetClick = (planet) => {
        setSelectedPlanet(planet);
    };

    useFrame(() => {
        setBodies((prevPlanets) => gravity.gravitationalField(prevPlanets)); 
        bodies.forEach((body)=>{
            if(body.name == selectedPlanet.name){
                const { x, y, z } = body.position;
                orbitControlsRef.current.target.set(x, y, z);
                camera.lookAt(x, y, z);
                orbitControlsRef.current.update();
            }
        })
    });

    return (
        <>
            {bodies.map((planet, index) => (
                <Planet
                    key={index}
                    planet={planet}
                    onClick={() => handlePlanetClick(planet)} 
                />
            ))}
            <ambientLight intensity={0.5} />
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
    );
}

export default Scene;
