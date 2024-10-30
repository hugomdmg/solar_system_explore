import { Line } from "@react-three/drei";

const Orbit = () => {
    const radius = 1;
    const segments = 100;
    const points = [];
    
    for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        points.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
    }

    return <Line points={points} color="skyblue" lineWidth={2} />;
};


export default Orbit