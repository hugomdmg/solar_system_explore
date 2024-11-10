import Dinamics from "./dinamics"
export default class Ship extends Dinamics {
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

    constructor(data) {
        super()
        if(data){
            this.position = data.position
            this.R = data.R
        }
    }

    updateShip(R, position){
        this.R = R
        this.position = position
    }

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

    rotateXAxis(angle) {
        const rotationAngle = angle * 0.06;
        this.R.uy = this.rotate(rotationAngle, this.R.ux, [this.R.uy])[0];
        this.R.uz = this.rotate(rotationAngle, this.R.ux, [this.R.uz])[0];
        this.direction = this.rotate(rotationAngle, this.R.ux, [this.direction])[0];
        this.shape = this.rotate(rotationAngle, this.R.ux, this.shape);
    }

    rotateYAxis(angle) {
        const rotationAngle = angle * 0.03;
        this.R.ux = this.rotate(rotationAngle, this.R.uy, [this.R.ux])[0];
        this.R.uz = this.rotate(rotationAngle, this.R.uy, [this.R.uz])[0];
        this.direction = this.rotate(rotationAngle, this.R.uy, [this.direction])[0];
        this.shape = this.rotate(rotationAngle, this.R.uy, this.shape);
    }

    rotateZAxis(angle) {
        const rotationAngle = angle * 0.03;
        this.R.ux = this.rotate(rotationAngle, this.R.uz, [this.R.ux])[0];
        this.R.uy = this.rotate(rotationAngle, this.R.uz, [this.R.uy])[0];
        this.direction = this.rotate(rotationAngle, this.R.uz, [this.direction])[0];
        this.shape = this.rotate(rotationAngle, this.R.uz, this.shape);
    }

    moveShip() {
        this.position.x += this.velocity.vx;
        this.position.y += this.velocity.vy;
        this.position.z += this.velocity.vz;
        this.view.x = this.position.x - this.direction.x * 0.1;
        this.view.y = this.position.y - this.direction.y * 0.1;
        this.view.z = this.position.z - this.direction.z * 0.1;

        return this;
    }

    getPoints() {
        let points = []
        this.shape.forEach(point => {
            points.push([point.x + this.position.x, point.y + this.position.y, point.z + this.position.z])
        })
        return points
    }

    accelerate(amount) {
        const norm = this.distance(this.direction, { x: 0, y: 0, z: 0 })
        if (norm > 0) {
            this.velocity.vx += amount * (this.direction.x / norm) * 0.001;
            this.velocity.vy += amount * (this.direction.y / norm) * 0.001;
            this.velocity.vz += amount * (this.direction.z / norm) * 0.001;
        }
    }

    break() {
        const reductionFactor = 0.4;
        const hold = 0.0001;

        this.velocity.vx = Math.abs(this.velocity.vx) < hold ? 0 : this.velocity.vx * reductionFactor;
        this.velocity.vy = Math.abs(this.velocity.vy) < hold ? 0 : this.velocity.vy * reductionFactor;
        this.velocity.vz = Math.abs(this.velocity.vz) < hold ? 0 : this.velocity.vz * reductionFactor;
    }

    setShipHorientation(){
        this.shape = this.shape.map(point => {
            return this.rotationMatrix(point, this.R)
        })
    }
}