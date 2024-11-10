import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import React, { useRef } from 'react';
import Orbit from './Orbit';
import Dinamics from '../infrastructure/dinamics';

const dinamics = new Dinamics();

const Planet = ({ scale, planet, render, onClick }) => {
    const texture = useLoader(THREE.TextureLoader, '/maps/' + planet.name + '.jpg');
    const meshRef = useRef();
    const light = planet.name === 'sun' ? 1 : 0;
    const radius = dinamics.distance({ x: 0, y: 0, z: 0 }, planet.position);
    const position = [planet.position.x, planet.position.y, planet.position.z];

    scale = (scale == 100 && planet.name == 'sun') ? 10 : scale
    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += planet.rotation;
        }
    });

    return (
        <>
            {scale == 1 && <mesh onClick={() => onClick(planet)} position={position}>
                <sphereGeometry args={[0.1, 64, 64]} />
                <meshStandardMaterial
                    color="blue"
                    emissive="white"
                    transparent
                    opacity={0.1}
                    emissiveIntensity={1}
                //visible={planet.name != 'moon'}
                />
            </mesh>}
            {(render || scale == 100) && (
                <mesh ref={meshRef} position={position}>
                    <sphereGeometry args={[scale * planet.radius, 128, 128]} />
                    <meshStandardMaterial
                        map={texture}
                        color="white"
                        emissive="white"
                        emissiveIntensity={light}
                        decay={1}
                    />
                </mesh>
            )
            }
            <Orbit radius={radius} />
        </>
    );
};

export default Planet;
