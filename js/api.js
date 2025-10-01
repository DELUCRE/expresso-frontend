const API_BASE_URL = 'http://localhost:5001/api';

class API {
    static async login(username, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            
            return await response.json();
        } catch (error) {
            console.error('Erro no login:', error);
            return { success: false, message: 'Erro de conexão' };
        }
    }
    
    static async getEntregas() {
        try {
            const response = await fetch(`${API_BASE_URL}/entregas`);
            return await response.json();
        } catch (error) {
            console.error('Erro ao buscar entregas:', error);
            return [];
        }
    }
    
    static async criarEntrega(entrega) {
        try {
            const response = await fetch(`${API_BASE_URL}/entregas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entrega)
            });
            
            return await response.json();
        } catch (error) {
            console.error('Erro ao criar entrega:', error);
            return { success: false };
        }
    }
}
