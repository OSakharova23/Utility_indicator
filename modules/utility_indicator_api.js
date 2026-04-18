// modules/utility_indicator_api.js

export class UtilityIndicatorApi {
    
    /**
     * GET запрос через fetch
     * @param {string} url - Адрес запроса
     * @returns {Promise} - Promise с данными
     */
    async utility_indicator_get(url) {
        try {
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return { data, status: response.status };
        } catch (error) {
            console.error('GET request error:', error);
            throw error;
        }
    }

    /**
     * POST запрос через fetch
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для отправки
     * @returns {Promise} - Promise с данными
     */
    async utility_indicator_post(url, data) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const responseData = await response.json();
            return { data: responseData, status: response.status };
        } catch (error) {
            console.error('POST request error:', error);
            throw error;
        }
    }

    /**
     * PATCH запрос через fetch
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для обновления
     * @returns {Promise} - Promise с данными
     */
    async utility_indicator_patch(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const responseData = await response.json();
            return { data: responseData, status: response.status };
        } catch (error) {
            console.error('PATCH request error:', error);
            throw error;
        }
    }

    /**
     * DELETE запрос через fetch
     * @param {string} url - Адрес запроса
     * @returns {Promise} - Promise с статусом
     */
    async utility_indicator_delete(url) {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });
            
            if (!response.ok && response.status !== 204) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return { status: response.status };
        } catch (error) {
            console.error('DELETE request error:', error);
            throw error;
        }
    }
}

export const utility_indicator_api = new UtilityIndicatorApi();