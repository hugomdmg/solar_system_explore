export default class Api {

    development_url = 'http://localhost:3000'
    production_url = 'https://solar-system-api-seven.vercel.app'

    constructor() { }

    async get(url) {
        const response = await fetch(this.development_url + url)
        return response.json()
    }

    async post(url, data) {
        const response = await fetch(this.development_url + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    async getShips(ship) {
        return await this.post('/ships', ship)
    }

    async getShots(shot) {
        return await this.post('/shots', shot)
    }

    async getShotsData() {
        return await this.get('/shots-data')
    }

}