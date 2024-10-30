class Dinamics {

    movement(bodies) {
        bodies.forEach((body) => {
            body.position.x += body.position.vx
            body.position.y += body.position.vy
            body.position.z += body.position.vz
        })

        return bodies
    }

    rotate(alfa, rotationAxis, cartesiansCoordenates) {
        let cos = Math.cos(alfa), sin = Math.sin(alfa)
        let ux = rotationAxis.x, uy = rotationAxis.y, uz = rotationAxis.z
        return cartesiansCoordenates.map((point) => {
            point.x = point.x * (cos + ux * ux * (1 - cos)) + point.y * (ux * uy * (1 - cos) - uz * sin) + point.z * (ux * uz * (1 - cos) + uy * sin)
            point.y = point.x * (uy * ux * (1 - cos) + uz * sin) + point.y * (cos + uy * uy * (1 - cos)) + point.z * (uy * uz * (1 - cos) - ux * sin)
            point.z = point.x * (uz * ux * (1 - cos) - uy * sin) + point.y * (uz * uy * (1 - cos) + ux * sin) + point.z * (cos + uz * uz * (1 - cos))
            point.vx = point.vx * (cos + ux * ux * (1 - cos)) + point.vy * (ux * uy * (1 - cos) - uz * sin) + point.vz * (ux * uz * (1 - cos) + uy * sin)
            point.vy = point.vx * (uy * ux * (1 - cos) + uz * sin) + point.vy * (cos + uy * uy * (1 - cos)) + point.vz * (uy * uz * (1 - cos) - ux * sin)
            point.vz = point.vx * (uz * ux * (1 - cos) - uy * sin) + point.vy * (uz * uy * (1 - cos) + ux * sin) + point.vz * (cos + uz * uz * (1 - cos))
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