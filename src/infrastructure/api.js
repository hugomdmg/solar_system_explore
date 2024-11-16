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

    async getImage(name) {
        try {
            const response = await fetch(this.development_url + '/images/' + name);

            if (!response.ok) {
                throw new Error(`Error al obtener la imagen: ${response.statusText}`);
            }

            const blob = await response.blob();
            return URL.createObjectURL(blob);
        } catch (error) {
            console.error('Error en la solicitud de la imagen:', error);
            return null; // Puedes devolver null o manejar el error según lo necesites.
        }
    }


}