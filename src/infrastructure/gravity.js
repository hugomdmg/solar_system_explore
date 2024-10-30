class Gravity {
    g = 0.1;
    t = 1
    type = 'planet'

    constructor(gravity) {
        this.g = gravity
    }

    calculateVelocityVector(point1, point2, mass1, mass2) {
        if (point1 !== point2) {
            let d = this.calculateDistance(point1, point2)
            let ax = this.calculateAxisGravity('x', d, point1, point2, mass1, mass2),
                ay = this.calculateAxisGravity('y', d, point1, point2, mass1, mass2),
                az = this.calculateAxisGravity('z', d, point1, point2, mass1, mass2)

            point1.x += point1.vx * this.t + 0.5 * ax * Math.pow(this.t, 2);
            point1.y += point1.vy * this.t + 0.5 * ay * Math.pow(this.t, 2);
            point1.z += point1.vz * this.t + 0.5 * az * Math.pow(this.t, 2);
            point1.vx += ax * this.t;
            point1.vy += ay * this.t;
            point1.vz += az * this.t;
        }
        return point1
    }

    calculateAxisGravity(axis, d, point1, point2, mass1, mass2) {
        if(this.type == 'planet') mass1 = 1
        return ((-this.g * mass2 * (point1[axis] - point2[axis])) / Math.pow(d, 3/2));
    }

    calculateDistance(point1, point2) {
        return Math.pow(
            Math.pow(point1.x - point2.x, 2) +
            Math.pow(point1.y - point2.y, 2) +
            Math.pow(point1.z - point2.z, 2),
            1 / 2
        )
    }

    calculateGravitacionalField(bodies) {
        bodies.forEach((body) => {
            for (let i = 0; i < bodies.length; i++) {
                body.position = this.calculateVelocityVector(body.position, bodies[i].position, body.mass, bodies[i].mass)
            }
        })
        return bodies
    }

    acelerate(direction) {
        this.t += 5 * direction
    }
}

export default Gravity