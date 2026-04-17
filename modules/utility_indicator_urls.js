export class UtilityIndicatorUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    utility_indicator_getServices() {
        return `${this.baseUrl}/utility_indicator`;
    }

    utility_indicator_getServiceById(id) {
        return `${this.baseUrl}/utility_indicator/${id}`;
    }

    utility_indicator_createService() {
        return `${this.baseUrl}/utility_indicator`;
    }

    utility_indicator_removeService(id) {
        return `${this.baseUrl}/utility_indicator/${id}`;
    }

    utility_indicator_updateService(id) {
        return `${this.baseUrl}/utility_indicator/${id}`;
    }
}

export const utility_indicator_urls = new UtilityIndicatorUrls();