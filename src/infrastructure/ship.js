import Dinamics from "./dinamics"

const dinamics = new Dinamics();

class Ship {

    R = {
        ux: { x: 1, y: 0, z: 0 },
        uy: { x: 0, y: 1, z: 0 },
        uz: { x: 0, y: 0, z: 1 }
    };

    shape = [
        { z: 0.003, x: 0.003, y: 0 },
        { z: 0.003, x: -0.006, y: 0.0001 },
        { z: -0.003, x: -0.006, y: 0.0001 },
        { z: -0.003, x: 0.003, y: 0 },
        { z: 0.003, x: 0.003, y: 0 },
        { z: 0, x: 0.003, y: 0.003 },
        { z: -0.003, x: 0.003, y: 0 }
    ];

    radius = 0.5;
    mass = 0;
    position = { x: 0.1, y: 0, z: 0 };
    velocity = { vx: 0.001, vy: 0, vz: 0 };
    direction = { x: 1, y: 0, z: 0 };
    view = { x: 0, y: 0, z: 0 };

    constructor() { }

    /**
     * Executes an action based on a key event.
     * @param {KeyboardEvent} event - The key event to determine the action.
     */
    actionShip(event) {
        switch (event.key) {
            case 'a': this.rotateYAxis(1); break;
            case 'd': this.rotateYAxis(-1); break;
            case 'w': this.rotateZAxis(1); break;
            case 's': this.rotateZAxis(-1); break;
            case 'q': this.rotateXAxis(-1); break;
            case 'e': this.rotateXAxis(1); break;
            case 'r': this.accelerate(1); break;
            case 'f': this.accelerate(-1); break;
            case 'g': this.break(); break;
            default: break;
        }
        return this;
    }

    /**
     * Rotates the ship around the X-axis by a given angle.
     * @param {number} angle - The angle to rotate (in radians).
     */
    rotateXAxis(angle) {
        const rotationAngle = angle * 0.06;
        this.R.uy = dinamics.rotate(rotationAngle, this.R.ux, [this.R.uy])[0];
        this.R.uz = dinamics.rotate(rotationAngle, this.R.ux, [this.R.uz])[0];
        this.direction = dinamics.rotate(rotationAngle, this.R.ux, [this.direction])[0];
        this.shape = dinamics.rotate(rotationAngle, this.R.ux, this.shape);
    }

    /**
     * Rotates the ship around the Y-axis by a given angle.
     * @param {number} angle - The angle to rotate (in radians).
     */
    rotateYAxis(angle) {
        const rotationAngle = angle * 0.03;
        this.R.ux = dinamics.rotate(rotationAngle, this.R.uy, [this.R.ux])[0];
        this.R.uz = dinamics.rotate(rotationAngle, this.R.uy, [this.R.uz])[0];
        this.direction = dinamics.rotate(rotationAngle, this.R.uy, [this.direction])[0];
        this.shape = dinamics.rotate(rotationAngle, this.R.uy, this.shape);
    }

    /**
     * Rotates the ship around the Z-axis by a given angle.
     * @param {number} angle - The angle to rotate (in radians).
     */
    rotateZAxis(angle) {
        const rotationAngle = angle * 0.03;
        this.R.ux = dinamics.rotate(rotationAngle, this.R.uz, [this.R.ux])[0];
        this.R.uy = dinamics.rotate(rotationAngle, this.R.uz, [this.R.uy])[0];
        this.direction = dinamics.rotate(rotationAngle, this.R.uz, [this.direction])[0];
        this.shape = dinamics.rotate(rotationAngle, this.R.uz, this.shape);
    }

    /**
     * Updates the ship's position based on its velocity and direction.
     */
    moveShip() {
        this.position.x += this.velocity.vx;
        this.position.y += this.velocity.vy;
        this.position.z += this.velocity.vz;

        // Update the view based on the new position and direction
        this.view.x = this.position.x - this.direction.x * 0.1;
        this.view.y = this.position.y - this.direction.y * 0.1;
        this.view.z = this.position.z - this.direction.z * 0.1;

        return this;
    }

    /**
     * Returns the absolute positions of the shape's points.
     */
    getPoints() {
        let points = []
        this.shape.forEach(point => {
            points.push([point.x + this.position.x, point.y + this.position.y, point.z + this.position.z])
        })
        return points
    }

    /**
     * Adjusts the ship's velocity in the current direction.
     * Normalizes direction if necessary to avoid excessive values.
     * @param {number} amount - Factor by which to accelerate.
     */
    accelerate(amount) {
        const norm = Math.sqrt(this.direction.x ** 2 + this.direction.y ** 2 + this.direction.z ** 2);
        if (norm > 0) {
            this.velocity.vx += amount * (this.direction.x / norm) * 0.001;
            this.velocity.vy += amount * (this.direction.y / norm) * 0.001;
            this.velocity.vz += amount * (this.direction.z / norm) * 0.001;
        }
    }

    /**
     * Reduces the ship's velocity by a specific factor to simulate braking.
     */
    break() {
        const reductionFactor = 0.4;
        const threshold = 0.0001; // Minimum velocity threshold for stopping

        this.velocity.vx = Math.abs(this.velocity.vx) < threshold ? 0 : this.velocity.vx * reductionFactor;
        this.velocity.vy = Math.abs(this.velocity.vy) < threshold ? 0 : this.velocity.vy * reductionFactor;
        this.velocity.vz = Math.abs(this.velocity.vz) < threshold ? 0 : this.velocity.vz * reductionFactor;
    }
}

export default Ship;
