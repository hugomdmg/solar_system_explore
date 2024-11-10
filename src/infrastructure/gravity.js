class Gravity {
    constructor(gravity) {
        this.g = gravity;
    }

    velocityVector(point1, point2, velocity1, velocity2, mass1, mass2, t) {
        if (point1 !== point2) {
            let d = this.distance(point1, point2);
            let ax = this.axisGravity('x', d, point1, point2, mass1, mass2),
                ay = this.axisGravity('y', d, point1, point2, mass1, mass2),
                az = this.axisGravity('z', d, point1, point2, mass1, mass2);

            const newX = point1.x + velocity1.vx * t + 0.5 * ax * Math.pow(t, 2);
            const newY = point1.y + velocity1.vy * t + 0.5 * ay * Math.pow(t, 2);
            const newZ = point1.z + velocity1.vz * t + 0.5 * az * Math.pow(t, 2);

            const newVx = velocity1.vx + ax * t;
            const newVy = velocity1.vy + ay * t;
            const newVz = velocity1.vz + az * t;

            return {
                position: { x: newX, y: newY, z: newZ },
                velocity: { vx: newVx, vy: newVy, vz: newVz }
            };
        }
        return {
            position: { ...point1 },
            velocity: { vx: velocity1.vx, vy:velocity1.vy, vz:velocity1.vz }
        };
    }

    axisGravity(axis, d, point1, point2, mass1, mass2) {
        return (-this.g * mass2 * (point1[axis] - point2[axis])) / Math.pow(d, 3);
    }

    distance(point1, point2) {
        return Math.sqrt(
            Math.pow(point1.x - point2.x, 2) +
            Math.pow(point1.y - point2.y, 2) +
            Math.pow(point1.z - point2.z, 2)
        );
    }

    gravitationalField(bodies, t) {
        const updatedBodies = bodies.map((body) => ({
            ...body,
            position: { ...body.position },
            velocity: { ...body.velocity }
        }));

        updatedBodies.forEach((body, i) => {
            bodies.forEach((otherBody, j) => {
                if (i !== j) {
                    const { position, velocity } = this.velocityVector(
                        body.position,
                        otherBody.position,
                        body.velocity,
                        otherBody.velocty,
                        body.mass,
                        otherBody.mass,
                        t
                    );
                    body.position = position;
                    body.velocity = velocity;
                }
            });
        });
        return updatedBodies;
    }
}

export default Gravity;
 
