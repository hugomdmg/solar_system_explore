const planets = [
    {
        name: 'sun',
        radius: 6.963 * Math.pow(10, 8),
        mass: 1.989 * Math.pow(10, 30),
        position: {
            x: 0,
            y: 0,
            z: 0,
        },
        velocity: {
            vx: 0,
            vy: 0,
            vz: 0
        },
        rotation: 0
    },
    {
        name: 'mercury',
        radius: 2.439 * Math.pow(10, 6),
        mass: 3.301 * Math.pow(10, 23),
        position: {
            x: 5.791 * Math.pow(10, 10),
            y: 0,
            z: 0,
        },
        velocity: {
            vx: 0,
            vy: 0,
            vz: 0
        },
        rotation: 0.0001
    },
    {
        name: 'venus',
        radius: 6.052 * Math.pow(10, 6),
        mass: 4.87 * Math.pow(10, 24),
        position: {
            x: 1.08 * Math.pow(10, 11),
            y: 0,
            z: 0
        },
        velocity: {
            vx: 0,
            vy: 0,
            vz: 0
        },
        rotation: 0.0001
    },
    {
        name: 'earth',
        radius: 6.371 * Math.pow(10, 6),
        mass: 5.972 * Math.pow(10, 24),
        position: {
            x: 1.496 * Math.pow(10, 11),
            y: 0,
            z: 0,
        },
        velocity: {
            vx: 0,
            vy: 0,
            vz: 0
        },
        rotation: 0.0002
    }, 
    //{
    //     name: 'moon',
    //     radius: 1.737 * Math.pow(10, 6),
    //     mass: 7.34 * Math.pow(10, 22),
    //     position: {
    //         x: 1.496 * Math.pow(10, 11)-3.84*Math.pow(10, 8),
    //         y: 0,
    //         z: 0
    //     },
    //     velocity: {
    //         vx: 0,
    //         vy: 0,
    //         vz: 0
    //     },
    //     rotation: 0
    // },
    {
        name: 'mars',
        radius: 3.389 * Math.pow(10, 6),
        mass: 6.42 * Math.pow(10, 23),
        position: {
            x: 2.28 * Math.pow(10, 11),
            y: 0,
            z: 0
        },
        velocity: {
            vx: 0,
            vy: 0,
            vz: 0
        },
        rotation: 0.0005
    }, {
        name: 'jupiter',
        radius: 6.9911 * Math.pow(10, 7),
        mass: 1.9 * Math.pow(10, 27),
        position: {
            x: 7.78 * Math.pow(10, 11),
            y: 0,
            z: 0
        },
        velocity: {
            vx: 0,
            vy: 0,
            vz: 0
        },
        rotation: 0.0005
    }, {
        name: 'saturn',
        radius: 5.8232 * Math.pow(10, 7),
        mass: 5.68 * Math.pow(10, 26),
        position: {
            x: 1.43 * Math.pow(10, 12),
            y: 0,
            z: 0
        },
        velocity: {
            vx: 0,
            vy: 0,
            vz: 0
        },
        rotation: 0.0005
    }, {
        name: 'uranus',
        radius: 2.5362 * Math.pow(10, 7),
        mass: 8.68 * Math.pow(10, 25),
        position: {
            x: 2.87 * Math.pow(10, 12),
            y: 0,
            z: 0
        },
        velocity: {
            vx: 0,
            vy: 0,
            vz: 0
        },
        rotation: 0.0005
    },
    {
        name: 'neptune',
        radius: 2.462 * Math.pow(10, 7),
        mass: 1.024 * Math.pow(10, 26),
        position: {
            x: 4.5 * Math.pow(10, 12),
            y: 0,
            z: 0,
        },
        velocity: {
            vx: 0,
            vy: 0,
            vz: 0
        },
        rotation: 0.0005
    }
]

export default planets;

