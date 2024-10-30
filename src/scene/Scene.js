import React, { useRef, useState } from 'react';
import { Canvas} from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import Planet from './Planet';
import planets from '../infrastructure/data_planets';
import Gravity from '../infrastructure/gravity';

const gravity = new Gravity()

function Scene() {
    const cameraRef = useRef();
    const orbitControlsRef = useRef();
    const [target, setTarget] = useState([0, 0, 0]); 

    const centerOnPlanet = (position) => {
        setTarget(position); 
        if (cameraRef.current && gravity.calculateDistance(cameraRef.current.position, position) > 0.3) {
            cameraRef.current.lookAt(...position);
        }
    };

    return (
        <Canvas style={{ width: '100vw', height: '100vh' }}
            camera={{ position: [0.5, 0.5, 0], fov: 30, near: 0.00001, far: 100 }}
        >
            {planets.map((planet) => (
                <Planet
                    key={planet.name}
                    onClick={() => centerOnPlanet([planet.position.x, planet.position.y, planet.position.z])}
                    planet={planet.name}
                    position={planet.position}
                    size={planet.radius}
                    rotation={planet.rotation}
                />
            ))}
            <ambientLight intensity={0} />
            <pointLight position={[0, 0, 0]} intensity={10} decay={1}/>
            <Environment files="/maps/stars.jpg" background={true} />
            <OrbitControls ref={orbitControlsRef} target={target} enableZoom={true} />
        </Canvas>
    );
}

export default Scene;

