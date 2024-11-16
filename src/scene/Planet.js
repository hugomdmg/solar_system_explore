import { useLoader, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import React, { useRef, useState, useEffect } from 'react';
import Orbit from './Orbit';
import Dinamics from '../infrastructure/dinamics';
import Api from '../infrastructure/api';

const dinamics = new Dinamics();
const api = new Api();

const Planet = ({ scale, planet, render, onClick }) => {
    const meshRef = useRef();
    const [texture, setTexture] = useState(null)
    const light = planet.name === 'sun' ? 1 : 0;
    const radius = dinamics.distance({ x: 0, y: 0, z: 0 }, planet.position);
    const position = [planet.position.x, planet.position.y, planet.position.z];
    const [mapLoaded, setMapLoaded] = useState(false) 

    scale = (scale === 100 && planet.name === 'sun') ? 10 : scale;

    useEffect(() => {
        if(!mapLoaded){
            const loadTexture = async () => {
                try {
                    const image = await api.getImage(planet.name + '.jpg')
                    const textureLoader = new THREE.TextureLoader();
                    textureLoader.load(image, (loadedTexture) => {
                        setTexture(loadedTexture)
                    });
                } catch (error) {
                    console.error('Error loading texture:', error);
                }
            }
            loadTexture();
            setMapLoaded(true)
        }
    }, [planet]);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += planet.rotation;
        }
    });

    return (
        <>
            {scale === 1 && (
                <mesh onClick={() => onClick(planet)} position={position}>
                    <sphereGeometry args={[0.1, 64, 64]} />
                    <meshStandardMaterial
                        color="blue"
                        emissive="white"
                        transparent
                        opacity={0.1}
                        emissiveIntensity={1}
                    />
                </mesh>
            )}
            {(render || scale === 100) && (
                <mesh ref={meshRef} position={position}>
                    <sphereGeometry args={[scale * planet.radius, 128, 128]} />
                    {texture && (
                        <meshStandardMaterial
                            map={texture}
                            color="white"
                            emissive="white"
                            emissiveIntensity={light}
                            decay={1}
                        />
                    )}
                </mesh>
            )}
            <Orbit radius={radius} />
        </>
    );
};

export default Planet;
