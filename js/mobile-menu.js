// ============================================================================
// MENU RESPONSIVO MELHORADO - EXPRESSO ITAPORANGA
// ============================================================================

class MobileMenu {
    constructor() {
        this.menuToggle = null;
        this.navMenu = null;
        this.closeButton = null;
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createElements();
        this.bindEvents();
        this.handleResize();
    }

    createElements() {
        // Encontrar ou criar botão hamburger
        this.menuToggle = document.querySelector('.mobile-menu-toggle');
        if (!this.menuToggle) {
            this.menuToggle = this.createMenuToggle();
        }

        // Encontrar menu de navegação
        this.navMenu = document.querySelector('.nav-menu');
        if (!this.navMenu) {
            console.warn('Menu de navegação não encontrado');
            return;
        }

        // Criar botão de fechar
        this.closeButton = this.createCloseButton();
    }

    createMenuToggle() {
        const toggle = document.createElement('button');
        toggle.className = 'mobile-menu-toggle';
        toggle.innerHTML = '☰';
        toggle.setAttribute('aria-label', 'Abrir menu de navegação');
        toggle.setAttribute('aria-expanded', 'false');
        
        // Inserir no header
        const header = document.querySelector('.header-institucional, header');
        if (header) {
            header.appendChild(toggle);
        } else {
            document.body.appendChild(toggle);
        }
        
        return toggle;
    }

    createCloseButton() {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-menu';
        closeBtn.innerHTML = '×';
        closeBtn.setAttribute('aria-label', 'Fechar menu de navegação');
        
        if (this.navMenu) {
            this.navMenu.appendChild(closeBtn);
        }
        
        return closeBtn;
    }

    bindEvents() {
        if (!this.menuToggle || !this.navMenu) return;

        // Toggle do menu
        this.menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggle();
        });

        // Botão de fechar
        if (this.closeButton) {
            this.closeButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.close();
            });
        }

        // Fechar ao clicar nos links
        const menuLinks = this.navMenu.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isOpen) {
                    this.close();
                }
            });
        });

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Fechar ao clicar fora do menu
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.navMenu.contains(e.target) && 
                !this.menuToggle.contains(e.target)) {
                this.close();
            }
        });

        // Redimensionamento da janela
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        if (!this.navMenu || !this.menuToggle) return;

        this.isOpen = true;
        this.navMenu.classList.add('active');
        this.menuToggle.innerHTML = '×';
        this.menuToggle.setAttribute('aria-expanded', 'true');
        
        // Prevenir scroll do body
        document.body.style.overflow = 'hidden';
        
        // Focus no primeiro link do menu
        const firstLink = this.navMenu.querySelector('a');
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 300);
        }

        // Adicionar classe ao body para estilos adicionais
        document.body.classList.add('mobile-menu-open');
    }

    close() {
        if (!this.navMenu || !this.menuToggle) return;

        this.isOpen = false;
        this.navMenu.classList.remove('active');
        this.menuToggle.innerHTML = '☰';
        this.menuToggle.setAttribute('aria-expanded', 'false');
        
        // Restaurar scroll do body
        document.body.style.overflow = '';
        
        // Remover classe do body
        document.body.classList.remove('mobile-menu-open');
        
        // Retornar focus para o botão hamburger
        this.menuToggle.focus();
    }

    handleResize() {
        // Fechar menu se a tela ficar grande
        if (window.innerWidth > 768 && this.isOpen) {
            this.close();
        }
    }
}

// ============================================================================
// UTILITÁRIOS PARA RESPONSIVIDADE
// ============================================================================

class ResponsiveUtils {
    static preventHorizontalScroll() {
        // Prevenir scroll horizontal
        document.documentElement.style.overflowX = 'hidden';
        document.body.style.overflowX = 'hidden';
    }

    static optimizeImages() {
        // Tornar todas as imagens responsivas
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.style.maxWidth) {
                img.style.maxWidth = '100%';
                img.style.height = 'auto';
            }
        });
    }

    static optimizeTables() {
        // Tornar tabelas responsivas
        const tables = document.querySelectorAll('table');
        tables.forEach(table => {
            if (!table.parentElement.classList.contains('table-responsive')) {
                const wrapper = document.createElement('div');
                wrapper.className = 'table-responsive';
                table.parentNode.insertBefore(wrapper, table);
                wrapper.appendChild(table);
            }
        });
    }

    static addTouchSupport() {
        // Melhorar suporte a touch
        const clickableElements = document.querySelectorAll('button, a, .clickable');
        clickableElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            element.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('touch-active');
                }, 150);
            });
        });
    }

    static optimizeViewport() {
        // Configurar viewport se não existir
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.name = 'viewport';
            viewport.content = 'width=device-width, initial-scale=1.0, user-scalable=yes';
            document.head.appendChild(viewport);
        }
    }
}

// ============================================================================
// INICIALIZAÇÃO
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar menu mobile
    const mobileMenu = new MobileMenu();
    
    // Aplicar otimizações responsivas
    ResponsiveUtils.preventHorizontalScroll();
    ResponsiveUtils.optimizeImages();
    ResponsiveUtils.optimizeTables();
    ResponsiveUtils.addTouchSupport();
    ResponsiveUtils.optimizeViewport();
    
    console.log('Menu responsivo inicializado com sucesso');
});

// ============================================================================
// EXPORTAR PARA USO GLOBAL
// ============================================================================

window.MobileMenu = MobileMenu;
window.ResponsiveUtils = ResponsiveUtils;
