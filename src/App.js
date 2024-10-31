import './App.css'
import Scene from './scene/Scene'
import { Canvas } from '@react-three/fiber'

function App() {
  return (
    <div className="App">
      <Canvas style={{ width: '100vw', height: '100vh' }}
        camera={{ position: [0.5, 0.5, 0], fov: 30, near: 0.00001, far: 100 }}>
        <Scene />
      </Canvas>
    </div>
  )
}

export default App
