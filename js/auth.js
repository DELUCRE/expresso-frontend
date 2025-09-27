class Auth {
    static async login(username, password) {
        const result = await API.login(username, password);
        
        if (result.success) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('user', JSON.stringify(result.user));
            window.location.href = 'gestao.html'; // Redirecionar para a página de gestão
        } else {
            this.showError(result.message);
        }
    }
    
    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'login.html'; // Redirecionar para a página de login
    }

    static showError(message) {
        alert(message); // Substituir por um toast/modal mais elegante no futuro
    }

    static checkAuthentication() {
        const token = localStorage.getItem('token');
        if (!token && window.location.pathname.endsWith('gestao.html')) {
            window.location.href = 'login.html';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    Auth.checkAuthentication();

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            Auth.login(username, password);
        });
    }

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            Auth.logout();
        });
    }
});
