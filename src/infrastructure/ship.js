import Dinamics from "./dinamics"

const dinamics = new Dinamics()

class Ship {

    R = {
        ux: {
            x: 1,
            y: 0,
            z: 0
        },
        uy: {
            x: 0,
            y: 1,
            z: 0
        },
        uz: {
            x: 0,
            y: 0,
            z: 1
        }
    }

    shape = [
        {
            z: 0.01,
            x: 0.01,
            y: 0
        },
        {
            z: 0.01,
            x: -0.02,
            y: 0.001
        },
        {
            z: -0.01,
            x: -0.02,
            y: 0.001
        },
        {
            z: -0.01,
            x: 0.01,
            y: 0
        },
        {
            z: 0.01,
            x: 0.01,
            y: 0
        },
        {
            z: 0,
            x: 0.01,
            y: 0.01
        },
        {
            z: -0.01,
            x: 0.01,
            y: 0
        }
    ]


    radius = 0.5
    mass = 0
    position = {
        x: 0.1,
        y: 0,
        z: 0
    }
    velocity = {
        vx: 0.001,
        vy: 0,
        vz: 0
    }
    direction = {
        x: 1,
        y: 0,
        z: 0
    }
    view = {
        x: 0,
        y: 0,
        z: 0
    }

    constructor() { }

    actionShip(event) {
        switch (event.key) {
            case 'a':
                this.rotateYAxis(1)
                break
            case 'd':
                this.rotateYAxis(-1)
                break
            case 'w':
                this.rotateZAxis(1)
                break
            case 's':
                this.rotateZAxis(-1)
                break
            case 'q':
                this.rotateXAxis(-1)
                break
            case 'e':
                this.rotateXAxis(1)
                break
            case 'r':
                this.acelerate(1)
                break
            case 'f':
                this.acelerate(-1)
                break
            case 'g':
                this.break()
                break
            default:
                break
        }
        return this
    }

    rotateXAxis(a) {
        this.R.uy = dinamics.rotate(a * 0.06, this.R.ux, [this.R.uy])[0]
        this.R.uz = dinamics.rotate(a * 0.06, this.R.ux, [this.R.uz])[0]
        this.direction = dinamics.rotate(a * 0.06, this.R.ux, [this.direction])[0]
        this.shape = dinamics.rotate(a * 0.06, this.R.ux, this.shape)
    }

    rotateYAxis(a) {
        this.R.ux = dinamics.rotate(a * 0.03, this.R.uy, [this.R.ux])[0]
        this.R.uz = dinamics.rotate(a * 0.03, this.R.uy, [this.R.uz])[0]
        this.direction = dinamics.rotate(a * 0.03, this.R.uy, [this.direction])[0]
        this.shape = dinamics.rotate(a * 0.03, this.R.uy, this.shape)
    }

    rotateZAxis(a) {
        this.R.ux = dinamics.rotate(a * 0.03, this.R.uz, [this.R.ux])[0]
        this.R.uy = dinamics.rotate(a * 0.03, this.R.uz, [this.R.uy])[0]
        this.direction = dinamics.rotate(a * 0.03, this.R.uz, [this.direction])[0]
        this.shape = dinamics.rotate(a * 0.03, this.R.uz, this.shape)
    }

    moveShip() {
        this.position.x += this.velocity.vx
        this.position.y += this.velocity.vy
        this.position.z += this.velocity.vz
        this.view.x = this.position.x - this.direction.x * 0.1
        this.view.y = this.position.y - this.direction.y * 0.1
        this.view.z = this.position.z - this.direction.z * 0.1
        return this
    }

    getPoints() {
        let points = []
        this.shape.forEach(point => {
            points.push([point.x + this.position.x, point.y + this.position.y, point.z + this.position.z])
        })
        return points
    }

    acelerate(a) {
        this.velocity.vx += a * this.direction.x * 0.001
        this.velocity.vy += a * this.direction.y * 0.001
        this.velocity.vz += a * this.direction.z * 0.001
    }

    break() {
        this.velocity.vx -= this.velocity.vx * 0.6
        this.velocity.vy -= this.velocity.vy * 0.6
        this.velocity.vz -= this.velocity.vz * 0.6
    }

}


export default Ship