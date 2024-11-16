export default class Shot {
    
    constructor(ship) {
        this.id = Math.random()
        this.userId = ship.userId
        this.position = ship.position
        this.velocity = {
            x: ship.direction.x * 0.01 + ship.velocity.vx,
            y: ship.direction.y * 0.01 + ship.velocity.vy,
            z: ship.direction.z * 0.01 + ship.velocity.vz
        }
    }

}