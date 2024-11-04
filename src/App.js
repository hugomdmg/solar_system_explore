import { useState } from 'react'
import './App.css'
import Scene from './scene/Scene'
import { Canvas } from '@react-three/fiber'

function App() {
const [cameraPosition, setCameraPosition] = useState([0.5, 0.5, 0])



  
  return (
    <div className="App">
      <Canvas style={{ width: '100vw', height: '100vh' }}
        camera={{ position: cameraPosition, fov: 30, near: 0.00001, far: 100 }}>
        <Scene />
      </Canvas>
    </div>
  )
}

export default App
