import React from 'react';
import { Canvas } from '@react-three/fiber';
import Menu from './menu/Menu';
import Scene from './scene/Scene';

export default function App() {
    return (
        <div className="App" style={styles.app}>
            <Menu />
            <Canvas
                style={styles.canvas}
                camera={{ position: [0.5, 0.5, 0], fov: 30, near: 0.00001, far: 100 }}
            >
                <Scene />
            </Canvas>
        </div>
    );
}

const styles = {
    app: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        backgroundColor: '#000',
    },
    canvas: {
        flex: 1,
        display: 'block',
        width: '100%',
        height: 'calc(100vh - 50px)'
    },
};
