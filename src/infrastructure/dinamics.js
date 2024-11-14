class Dinamics {

    normalVectorToPlane(v1, v2) {
        return {
            x: v1.y * v2.z - v1.z * v2.y,
            y: v1.z * v2.x - v1.x * v2.z,
            z: v1.x * v2.y - v1.y * v2.x
        };

    }

    distance(point1, point2) {
        return Math.sqrt(
            Math.pow(point1.x - point2.x, 2) +
            Math.pow(point1.y - point2.y, 2) +
            Math.pow(point1.z - point2.z, 2)
        );
    }

    unitaryVector(v) {
        let distance = this.distance({ x: 0, y: 0, z: 0 }, v)
        if (distance === 0) return { x: 0, y: 0, z: 0 };
        return ({
            x: v.x / distance,
            y: v.y / distance,
            z: v.z / distance
        })
    }

    rotate(alfa, rotationAxis, cartesiansCoordenates) {
        const cos = Math.cos(alfa), sin = Math.sin(alfa);
        const ux = rotationAxis.x, uy = rotationAxis.y, uz = rotationAxis.z;
        return cartesiansCoordenates.map((point) => {
            const x = point.x, y = point.y, z = point.z;
            return {
                x: x * (cos + ux * ux * (1 - cos)) + y * (ux * uy * (1 - cos) - uz * sin) + z * (ux * uz * (1 - cos) + uy * sin),
                y: x * (uy * ux * (1 - cos) + uz * sin) + y * (cos + uy * uy * (1 - cos)) + z * (uy * uz * (1 - cos) - ux * sin),
                z: x * (uz * ux * (1 - cos) - uy * sin) + y * (uz * uy * (1 - cos) + ux * sin) + z * (cos + uz * uz * (1 - cos))
            };
        });
    }

    rotateXAxis(alfa, cartesiansCoordenates) {
        return this.rotate(alfa, { x: 1, y: 0, z: 0 }, cartesiansCoordenates)
    }

    rotateYAxis(alfa, cartesiansCoordenates) {
        return this.rotate(alfa, { x: 0, y: 1, z: 0 }, cartesiansCoordenates)
    }

    rotateZAxis(alfa, cartesiansCoordenates) {
        return this.rotate(alfa, { x: 0, y: 0, z: 1 }, cartesiansCoordenates)
    }

    rotationMatrix(v, m) {
        let ux = m.ux
        let uy = m.uy
        let uz = m.uz
        let vector = {
            x: ux.x * v.x + uy.x * v.y + uz.x * v.z,
            y: ux.y * v.x + uy.y * v.y + uz.y * v.z,
            z: ux.z * v.x + uy.z * v.y + uz.z * v.z
        }
        return vector
    }
}


export default Dinamics;