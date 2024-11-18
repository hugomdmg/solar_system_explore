import React from 'react';
import { Canvas } from '@react-three/fiber';
import Menu from './menu/Menu'; // Suponiendo que tu menú esté en otro archivo
import Scene from './scene/Scene'; // Suponiendo que tu escena esté definida

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
        flexDirection: 'column', // El menú y el canvas estarán en columnas
        height: '100vh', // Ocupar toda la altura de la ventana
        width: '100vw', // Ocupar todo el ancho de la ventana
        overflow: 'hidden', // Evitar scroll no deseado
        backgroundColor: '#000', // Fondo oscuro por defecto
    },
    canvas: {
        flex: 1, // El canvas ocupa todo el espacio restante
        display: 'block', // Asegurar que se renderiza como un bloque
        width: '100%', // Asegurar que ocupa el ancho completo
        height: 'calc(100vh - 50px)', // Altura restante, considerando un menú de 50px
    },
};
