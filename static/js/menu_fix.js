// ============================================================================
// JAVASCRIPT CORRIGIDO PARA MENU HAMBURGER
// ============================================================================

// Função para toggle do menu mobile
function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (!navMenu || !menuToggle) {
        console.warn('Elementos do menu não encontrados');
        return;
    }
    
    const isActive = navMenu.classList.contains('active');
    
    if (isActive) {
        // Fechar menu
        navMenu.classList.remove('active');
        menuToggle.innerHTML = '☰';
        document.body.style.overflow = '';
    } else {
        // Abrir menu
        navMenu.classList.add('active');
        menuToggle.innerHTML = '×';
        document.body.style.overflow = 'hidden';
    }
}

// Fechar menu ao clicar em links
function closeMenuOnLinkClick() {
    const navMenu = document.getElementById('nav-menu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const links = navMenu?.querySelectorAll('a');
    
    if (!links) return;
    
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (menuToggle) menuToggle.innerHTML = '☰';
                document.body.style.overflow = '';
            }
        });
    });
}

// Fechar menu com tecla ESC
function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (navMenu?.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (menuToggle) menuToggle.innerHTML = '☰';
            document.body.style.overflow = '';
        }
    }
}

// Fechar menu ao redimensionar janela
function handleWindowResize() {
    const navMenu = document.getElementById('nav-menu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (window.innerWidth > 768) {
        if (navMenu) navMenu.classList.remove('active');
        if (menuToggle) menuToggle.innerHTML = '☰';
        document.body.style.overflow = '';
    }
}

// Inicializar quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Configurar eventos
    closeMenuOnLinkClick();
    
    // Event listeners
    document.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('resize', handleWindowResize);
    
    // Verificar se elementos existem
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (menuToggle && navMenu) {
        console.log('Menu hamburger inicializado com sucesso');
    } else {
        console.warn('Elementos do menu não encontrados:', {
            menuToggle: !!menuToggle,
            navMenu: !!navMenu
        });
    }
});

// ============================================================================
// CORREÇÕES PARA FORMULÁRIOS
// ============================================================================

// Função segura para mostrar erro no campo
function showFieldError(field, message) {
    if (!field || !field.classList) {
        console.warn('Campo inválido para mostrar erro:', field);
        return;
    }
    
    field.classList.add('error');
    field.setAttribute('aria-invalid', 'true');
    
    // Remover mensagem de erro anterior
    const existingError = field.parentNode?.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Criar nova mensagem de erro
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');
    
    if (field.parentNode) {
        field.parentNode.appendChild(errorDiv);
    }
}

// Função segura para limpar erro do campo
function clearFieldError(field) {
    if (!field || !field.classList) {
        console.warn('Campo inválido para limpar erro:', field);
        return;
    }
    
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');
    
    const errorMessage = field.parentNode?.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Validação de formulário de login
function validateLoginForm() {
    const usernameField = document.querySelector('input[name="username"]');
    const passwordField = document.querySelector('input[name="password"]');
    
    let isValid = true;
    
    // Limpar erros anteriores
    if (usernameField) clearFieldError(usernameField);
    if (passwordField) clearFieldError(passwordField);
    
    // Validar usuário
    if (!usernameField?.value?.trim()) {
        showFieldError(usernameField, 'Usuário é obrigatório');
        isValid = false;
    }
    
    // Validar senha
    if (!passwordField?.value) {
        showFieldError(passwordField, 'Senha é obrigatória');
        isValid = false;
    }
    
    return isValid;
}

// ============================================================================
// INICIALIZAÇÃO GLOBAL
// ============================================================================

// Garantir que funções estejam disponíveis globalmente
window.toggleMobileMenu = toggleMobileMenu;
window.showFieldError = showFieldError;
window.clearFieldError = clearFieldError;
window.validateLoginForm = validateLoginForm;
