import { Line } from "@react-three/drei";

const Orbit = ({radius}) => {
    const segments = 10000;
    const points = [];
    
    for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        points.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
    }

    return <Line points={points} color="skyblue" lineWidth={0.2} />;
};


export default Orbit