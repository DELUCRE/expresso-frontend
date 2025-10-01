// Sistema de roteamento do lado cliente
class Router {
    constructor() {
        this.routes = {
            '/': 'index.html',
            '/sobre': 'sobre.html',
            '/servicos': 'servicos.html',
            '/contato': 'contato.html',
            '/rastreamento': 'rastreamento.html',
            '/gestao/login': 'gestao/login.html'
        };
        
        this.init();
    }
    
    init() {
        // Interceptar cliques nos links de navegação
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (link && this.isInternalLink(link.href)) {
                e.preventDefault();
                this.navigate(link.href);
            }
        });
        
        // Interceptar mudanças na URL (botão voltar/avançar)
        window.addEventListener('popstate', () => {
            this.loadCurrentPage();
        });
        
        // Carregar página inicial
        this.loadCurrentPage();
    }
    
    isInternalLink(href) {
        const url = new URL(href, window.location.origin);
        return url.origin === window.location.origin && 
               (url.pathname in this.routes || url.pathname === '/');
    }
    
    navigate(url) {
        const urlObj = new URL(url, window.location.origin);
        const path = urlObj.pathname;
        
        if (path in this.routes || path === '/') {
            history.pushState(null, '', url);
            this.loadPage(path);
        }
    }
    
    loadCurrentPage() {
        const path = window.location.pathname;
        this.loadPage(path);
    }
    
    async loadPage(path) {
        try {
            // Normalizar o caminho
            let targetPath = path;
            if (path === '/') {
                targetPath = '/';
            } else if (this.routes[path]) {
                targetPath = path;
            } else {
                targetPath = '/'; // Fallback para homepage
            }
            
            // Carregar conteúdo da página
            let htmlFile;
            if (targetPath === '/') {
                htmlFile = 'index.html';
            } else {
                htmlFile = this.routes[targetPath];
            }
            
            if (htmlFile) {
                const response = await fetch(`/${htmlFile}`);
                if (response.ok) {
                    const html = await response.text();
                    this.updatePageContent(html, targetPath);
                } else {
                    this.loadHomePage();
                }
            } else {
                this.loadHomePage();
            }
            
        } catch (error) {
            console.error('Erro ao carregar página:', error);
            this.loadHomePage();
        }
    }
    
    updatePageContent(html, path) {
        // Extrair apenas o conteúdo do body
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newBody = doc.body;
        
        if (newBody) {
            // Atualizar o conteúdo do body
            document.body.innerHTML = newBody.innerHTML;
            
            // Atualizar o título
            const newTitle = doc.title;
            if (newTitle) {
                document.title = newTitle;
            }
            
            // Reinicializar o router para os novos elementos
            this.init();
            
            // Scroll para o topo
            window.scrollTo(0, 0);
        }
    }
    
    loadHomePage() {
        if (window.location.pathname !== '/') {
            history.pushState(null, '', '/');
        }
        // Se já estamos na homepage, não fazer nada
    }
}

// Inicializar o router quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    new Router();
});

// Também inicializar se o script for carregado após o DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new Router();
    });
} else {
    new Router();
}
