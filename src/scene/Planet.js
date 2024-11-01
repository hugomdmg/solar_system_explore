import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import React, { useRef } from 'react';
import Orbit from './Orbit';
import Gravity from '../infrastructure/gravity';

const gravity = new Gravity();

const Planet = ({ planet, onClick }) => {
    const texture = useLoader(THREE.TextureLoader, '/maps/' + planet.name + '.jpg');
    const meshRef = useRef();
    const light = planet.name === 'sun' ? 10 : 0;
    const radius = gravity.distance({ x: 0, y: 0, z: 0 }, planet.position);
    const position = [planet.position.x, planet.position.y, planet.position.z];

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += planet.rotation;
        }
    });

    return (
        <>
            <mesh onClick={() => onClick(planet)} position={position}>
                <sphereGeometry args={[0.1, 64, 64]} />
                <meshStandardMaterial
                    color="blue"
                    emissive="white"
                    transparent
                    opacity={0.2}
                    emissiveIntensity={10}
                    //visible={planet.name != 'moon'}
                />
            </mesh>
            <mesh ref={meshRef} position={position}>
                <sphereGeometry args={[planet.radius, 128, 128]} />
                <meshStandardMaterial
                    map={texture}
                    color="white"
                    emissive="white"
                    emissiveIntensity={light}
                    decay={1}
                />
            </mesh>
            <Orbit radius={radius} />
        </>
    );
};

export default Planet;
