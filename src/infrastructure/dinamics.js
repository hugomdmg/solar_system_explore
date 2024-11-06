class Dinamics {

    movement(bodies) {
        bodies.forEach((body) => {
            body.position.x += body.position.vx
            body.position.y += body.position.vy
            body.position.z += body.position.vz
        })

        return bodies
    }

    //=====================================

    normalVectorToPlane(v1, v2) {
        let x = (v1.y - v2.z) * (v1.z - v2.y)
        let y = -(v1.x - v2.z) * (v1.z - v2.x)
        let z = (v1.x - v2.y) * (v1.y - v2.x)
        return { x: x, y: y, z: z }
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
        return ({
            x: v.x / distance,
            y: v.y / distance,
            z: v.z / distance
        })
    }

    //=====================================

    rotate(alfa, rotationAxis, cartesiansCoordenates) {
        let cos = Math.cos(alfa), sin = Math.sin(alfa)
        let ux = rotationAxis.x, uy = rotationAxis.y, uz = rotationAxis.z
        return cartesiansCoordenates.map((point) => {
            point.x = point.x * (cos + ux * ux * (1 - cos)) + point.y * (ux * uy * (1 - cos) - uz * sin) + point.z * (ux * uz * (1 - cos) + uy * sin)
            point.y = point.x * (uy * ux * (1 - cos) + uz * sin) + point.y * (cos + uy * uy * (1 - cos)) + point.z * (uy * uz * (1 - cos) - ux * sin)
            point.z = point.x * (uz * ux * (1 - cos) - uy * sin) + point.y * (uz * uy * (1 - cos) + ux * sin) + point.z * (cos + uz * uz * (1 - cos))
            return point
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
}


export default Dinamics;