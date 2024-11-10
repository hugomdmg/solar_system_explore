import './App.css'
import Scene from './scene/Scene'
import { Canvas } from '@react-three/fiber'
import Api from './infrastructure/api'

function App() {

  const api = new Api()


  return (
    <div className="App">
      <Canvas style={{ width: '80vw', height: '100vh' }}
        camera={{ position: [0.5, 0.5, 0], fov: 30, near: 0.00001, far: 100 }}>
        <Scene />
      </Canvas>
      <button onClick={() => { console.log(api.get('')) }}>click</button>
    </div>
  )
}

export default App
