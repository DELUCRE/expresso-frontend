/**
 * Expresso Itaporanga - Frontend JavaScript
 * Main application logic and API integration
 */

// Configuration
const CONFIG = {
    API_BASE_URL: 'https://web-production-95d74.up.railway.app',
    TRACKING_CODE_PATTERN: /^[A-Z]{2}[0-9]{8}$/
};

// Utility functions
const Utils = {
    /**
     * Show alert message
     */
    showAlert(message, type = 'info', containerId = 'alertContainer') {
        const container = document.getElementById(containerId);
        if (!container) return;

        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        container.appendChild(alertDiv);

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    },

    /**
     * Format date to Brazilian format
     */
    formatDate(dateString) {
        if (!dateString) return 'N/A';
        
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    /**
     * Validate tracking code format
     */
    validateTrackingCode(code) {
        return CONFIG.TRACKING_CODE_PATTERN.test(code);
    },

    /**
     * Get status badge HTML
     */
    getStatusBadge(status) {
        const statusMap = {
            'pendente': { class: 'status-pendente', text: 'Pendente' },
            'em_transito': { class: 'status-em_transito', text: 'Em Trânsito' },
            'entregue': { class: 'status-entregue', text: 'Entregue' }
        };

        const statusInfo = statusMap[status] || { class: 'status-pendente', text: status };
        return `<span class="status-badge ${statusInfo.class}">${statusInfo.text}</span>`;
    }
};

// API Service
const ApiService = {
    /**
     * Make API request
     */
    async request(endpoint, options = {}) {
        const url = `${CONFIG.API_BASE_URL}${endpoint}`;
        
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        };

        const finalOptions = { ...defaultOptions, ...options };

        try {
            const response = await fetch(url, finalOptions);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }

            return data;
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    },

    /**
     * Track delivery
     */
    async trackDelivery(code) {
        return this.request(`/api/rastreamento/${code}`);
    },

    /**
     * Send contact message
     */
    async sendContact(data) {
        return this.request('/api/contato', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    },

    /**
     * Login user
     */
    async login(username, password) {
        return this.request('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
    },

    /**
     * Check authentication
     */
    async checkAuth() {
        return this.request('/api/auth/check');
    },

    /**
     * Get dashboard stats
     */
    async getDashboardStats() {
        return this.request('/api/dashboard/stats');
    },

    /**
     * Get deliveries
     */
    async getDeliveries() {
        return this.request('/api/entregas');
    },

    /**
     * Create delivery
     */
    async createDelivery(data) {
        return this.request('/api/entregas', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
};

// Tracking functionality
const TrackingService = {
    init() {
        const form = document.getElementById('trackingForm');
        if (form) {
            form.addEventListener('submit', this.handleTrackingSubmit.bind(this));
        }
    },

    async handleTrackingSubmit(event) {
        event.preventDefault();
        
        const codeInput = document.getElementById('trackingCode');
        const resultDiv = document.getElementById('trackingResult');
        const submitBtn = event.target.querySelector('button[type="submit"]');
        
        if (!codeInput || !resultDiv) return;

        const code = codeInput.value.trim().toUpperCase();
        
        // Validate format
        if (!Utils.validateTrackingCode(code)) {
            Utils.showAlert('Código de rastreamento inválido. Use o formato: EI12345678', 'warning');
            return;
        }

        // Show loading
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Rastreando...';
        submitBtn.disabled = true;

        try {
            const tracking = await ApiService.trackDelivery(code);
            this.displayTrackingResult(tracking, resultDiv);
        } catch (error) {
            if (error.message.includes('404')) {
                Utils.showAlert('Código de rastreamento não encontrado.', 'warning');
            } else {
                Utils.showAlert('Erro ao rastrear entrega. Tente novamente.', 'danger');
            }
            resultDiv.style.display = 'none';
        } finally {
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    },

    displayTrackingResult(tracking, container) {
        container.innerHTML = `
            <div class="tracking-result">
                <div class="row">
                    <div class="col-md-6">
                        <h5><i class="fas fa-box me-2"></i>Informações da Entrega</h5>
                        <p><strong>Código:</strong> ${tracking.codigo_rastreamento}</p>
                        <p><strong>Status:</strong> ${Utils.getStatusBadge(tracking.status)}</p>
                    </div>
                    <div class="col-md-6">
                        <h5><i class="fas fa-route me-2"></i>Rota</h5>
                        <p><strong>Origem:</strong> ${tracking.remetente_cidade}</p>
                        <p><strong>Destino:</strong> ${tracking.destinatario_cidade}</p>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6">
                        <p><strong>Criado em:</strong> ${Utils.formatDate(tracking.data_criacao)}</p>
                    </div>
                    <div class="col-md-6">
                        <p><strong>Atualizado em:</strong> ${Utils.formatDate(tracking.data_atualizacao)}</p>
                    </div>
                </div>
            </div>
        `;
        container.style.display = 'block';
        container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
};

// Contact form functionality
const ContactService = {
    init() {
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', this.handleContactSubmit.bind(this));
        }
    },

    async handleContactSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        const submitBtn = event.target.querySelector('button[type="submit"]');
        
        // Show loading
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
        submitBtn.disabled = true;

        try {
            const result = await ApiService.sendContact(data);
            Utils.showAlert(result.message, 'success');
            event.target.reset();
        } catch (error) {
            Utils.showAlert('Erro ao enviar mensagem. Tente novamente.', 'danger');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    }
};

// Management area functionality
const ManagementService = {
    init() {
        // Check if we're in management area
        if (window.location.pathname.includes('/gestao/')) {
            this.initManagement();
        }
    },

    initManagement() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleLogin.bind(this));
        }

        // Check authentication for protected pages
        if (!window.location.pathname.includes('login.html')) {
            this.checkAuthentication();
        }

        // Dashboard initialization
        if (window.location.pathname.includes('dashboard.html')) {
            this.initDashboard();
        }
    },

    async handleLogin(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const username = formData.get('username');
        const password = formData.get('password');
        const submitBtn = event.target.querySelector('button[type="submit"]');
        
        // Show loading
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Entrando...';
        submitBtn.disabled = true;

        try {
            const result = await ApiService.login(username, password);
            Utils.showAlert(result.message, 'success');
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = '/gestao/dashboard.html';
            }, 1000);
        } catch (error) {
            Utils.showAlert(error.message || 'Erro ao fazer login', 'danger');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    },

    async checkAuthentication() {
        try {
            await ApiService.checkAuth();
        } catch (error) {
            // Redirect to login if not authenticated
            window.location.href = '/gestao/login.html';
        }
    },

    async initDashboard() {
        try {
            const stats = await ApiService.getDashboardStats();
            this.updateDashboardStats(stats);
        } catch (error) {
            console.error('Error loading dashboard:', error);
        }
    },

    updateDashboardStats(stats) {
        const elements = {
            total: document.getElementById('totalEntregas'),
            pendentes: document.getElementById('entregasPendentes'),
            em_transito: document.getElementById('entregasTransito'),
            entregues: document.getElementById('entregasEntregues')
        };

        Object.keys(elements).forEach(key => {
            if (elements[key] && stats[key] !== undefined) {
                elements[key].textContent = stats[key];
            }
        });
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize services
    TrackingService.init();
    ContactService.init();
    ManagementService.init();

    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add fade-in animation to cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
});

// Export for use in other scripts
window.ExpressoApp = {
    Utils,
    ApiService,
    TrackingService,
    ContactService,
    ManagementService
};
