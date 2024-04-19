import axios from 'axios';

const API_URL = 'https://api-test.envia.com';
const AUTH_TOKEN = 'b0301d3ae7377cda358c533f53ab4d52db6e368ec7e596e16120984b59c1d169';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AUTH_TOKEN}`
    }
});

export default {
    getShippingRate(shipmentData) {
        return apiClient.post('/ship/rate/', shipmentData);
    },
    generateShipment(shipmentDetails) {
        const shipmentData = {
            origin: shipmentDetails.origin,
            destination: shipmentDetails.destination,
            packages: shipmentDetails.packages,
            shipment: shipmentDetails.shipment,
            settings: shipmentDetails.settings,
        };
        return apiClient.post('/ship/generate/', shipmentData);
    }
};
