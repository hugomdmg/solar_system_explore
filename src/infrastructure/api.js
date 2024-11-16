export default class Api {

    development_url = 'http://localhost:3000'
    production_url = 'https://solar-system-api-seven.vercel.app'

    constructor() { }

    async get(url) {
        const response = await fetch(this.production_url + url)
        return response.json()
    }

    async post(url, data) {
        const response = await fetch(this.production_url + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return await response.json();
    }

    async getShips(ship) {
        let result = await this.post('/ships', ship)
        return result.value
    }

    async sendShots(shot) {
        return await this.post('/shots', shot)
    }

    async getShotsData() {
        let result =  await this.get('/shots-data')
        return result.value
    }

    async getImage(name) {
        try {
            const response = await fetch(this.production_url + '/images/' + name);
            if (!response.ok) {
                throw new Error(`Error obtaining image: ${response.statusText}`);
            }
            const blob = await response.blob();
            return URL.createObjectURL(blob);
        } catch (error) {
            console.error('Error:', error);
            return null
        }
    }


}