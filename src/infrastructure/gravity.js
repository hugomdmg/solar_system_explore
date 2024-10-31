class Gravity {
    t = 0.01
    constructor(gravity) { this.g = gravity }

    velocityVector(point1, point2, mass1, mass2) {
        if (point1 !== point2) {
            let d = this.distance(point1, point2)
            let ax = this.axisGravity('x', d, point1, point2, mass1, mass2),
                ay = this.axisGravity('y', d, point1, point2, mass1, mass2),
                az = this.axisGravity('z', d, point1, point2, mass1, mass2)

            point1.x += point1.vx * this.t + 0.5 * ax * Math.pow(this.t, 2);
            point1.y += point1.vy * this.t + 0.5 * ay * Math.pow(this.t, 2);
            point1.z += point1.vz * this.t + 0.5 * az * Math.pow(this.t, 2);
            point1.vx += ax * this.t;
            point1.vy += ay * this.t;
            point1.vz += az * this.t;
        }
        return point1
    }

    axisGravity(axis, d, point1, point2, mass1, mass2) {
        return (-this.g * mass2 * (point1[axis] - point2[axis])) / Math.pow(d, 3 / 2);
    }

    distance(point1, point2) {
        return Math.pow(
            Math.pow(point1.x - point2.x, 2) +
            Math.pow(point1.y - point2.y, 2) +
            Math.pow(point1.z - point2.z, 2),
            1 / 2
        )
    }

    gravitationalField(bodies) {
        const updatedBodies = bodies.map((body) => ({ ...body })); 
    
        updatedBodies.forEach((body, i) => {
            bodies.forEach((otherBody, j) => {
                if (i !== j) {
                    const newPosition = this.velocityVector(
                        body.position,
                        otherBody.position,
                        body.mass,
                        otherBody.mass
                    );
                    body.position = {
                        ...body.position,
                        x: newPosition.x,
                        y: newPosition.y,
                        z: newPosition.z
                    };
                }
            });
        });
        return updatedBodies;
    }
}

export default Gravity
