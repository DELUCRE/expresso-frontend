// Menu Hamburger
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    }
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Rastreamento
document.addEventListener('DOMContentLoaded', function() {
    const rastreamentoForm = document.getElementById('rastreamentoForm');
    const resultadoDiv = document.getElementById('resultadoRastreamento');
    
    if (rastreamentoForm) {
        rastreamentoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const codigo = document.getElementById('codigoRastreamento').value.trim();
            
            if (!codigo) {
                alert('Por favor, digite um código de rastreamento.');
                return;
            }
            
            // Simular busca (substituir pela API real)
            buscarRastreamento(codigo);
        });
    }
    
    function buscarRastreamento(codigo) {
        // Mostrar loading
        if (resultadoDiv) {
            resultadoDiv.style.display = 'block';
            resultadoDiv.innerHTML = `
                <div class="loading-container">
                    <i class="fas fa-spinner fa-spin"></i>
                    <p>Buscando informações...</p>
                </div>
            `;
        }
        
        // Simular delay da API
        setTimeout(() => {
            // Dados simulados (substituir pela API real)
            const dadosSimulados = {
                codigo: codigo,
                status: 'Em Trânsito',
                origem: 'Guarulhos, SP',
                destino: 'Itaporanga, PB',
                dataEnvio: '15/10/2024',
                previsaoEntrega: '18/10/2024',
                historico: [
                    { data: '15/10/2024 09:00', evento: 'Objeto postado', local: 'Guarulhos, SP' },
                    { data: '15/10/2024 14:30', evento: 'Objeto em trânsito', local: 'São Paulo, SP' },
                    { data: '16/10/2024 08:15', evento: 'Objeto em trânsito', local: 'Feira de Santana, BA' },
                    { data: '17/10/2024 10:45', evento: 'Objeto chegou ao destino', local: 'Itaporanga, PB' }
                ]
            };
            
            mostrarResultadoRastreamento(dadosSimulados);
        }, 1500);
    }
    
    function mostrarResultadoRastreamento(dados) {
        if (!resultadoDiv) return;
        
        const statusClass = dados.status.toLowerCase().replace(/\s+/g, '-');
        
        resultadoDiv.innerHTML = `
            <div class="rastreamento-resultado">
                <div class="resultado-header">
                    <h3>Código: ${dados.codigo}</h3>
                    <span class="status-badge status-${statusClass}">${dados.status}</span>
                </div>
                
                <div class="resultado-info">
                    <div class="info-item">
                        <strong>Origem:</strong> ${dados.origem}
                    </div>
                    <div class="info-item">
                        <strong>Destino:</strong> ${dados.destino}
                    </div>
                    <div class="info-item">
                        <strong>Data de Envio:</strong> ${dados.dataEnvio}
                    </div>
                    <div class="info-item">
                        <strong>Previsão de Entrega:</strong> ${dados.previsaoEntrega}
                    </div>
                </div>
                
                <div class="historico">
                    <h4>Histórico de Movimentação</h4>
                    <div class="historico-lista">
                        ${dados.historico.map(item => `
                            <div class="historico-item">
                                <div class="historico-data">${item.data}</div>
                                <div class="historico-evento">${item.evento}</div>
                                <div class="historico-local">${item.local}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
});

// Formulário de contato
document.addEventListener('DOMContentLoaded', function() {
    const contatoForm = document.getElementById('contatoForm');
    
    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = new FormData(contatoForm);
            const dados = Object.fromEntries(formData);
            
            // Validar campos
            if (!validarFormulario(dados)) {
                return;
            }
            
            // Simular envio
            enviarContato(dados);
        });
    }
    
    function validarFormulario(dados) {
        const campos = contatoForm.querySelectorAll('input[required], textarea[required]');
        let valido = true;
        
        campos.forEach(campo => {
            if (!campo.value.trim()) {
                campo.style.borderColor = '#dc3545';
                valido = false;
            } else {
                campo.style.borderColor = '#ddd';
            }
        });
        
        return valido;
    }
    
    function enviarContato(dados) {
        const submitBtn = contatoForm.querySelector('button[type="submit"]');
        const textoOriginal = submitBtn.textContent;
        
        // Mostrar loading
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;
        
        // Simular envio
        setTimeout(() => {
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            contatoForm.reset();
            
            // Restaurar botão
            submitBtn.textContent = textoOriginal;
            submitBtn.disabled = false;
        }, 2000);
    }
});

// Animações ao scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.diferencial-card, .servico-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-in');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#ffffff';
        header.style.backdropFilter = 'none';
    }
});

// Utilitários
function formatarTelefone(telefone) {
    return telefone.replace(/\D/g, '')
                  .replace(/(\d{2})(\d)/, '($1) $2')
                  .replace(/(\d{4})(\d)/, '$1-$2')
                  .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3');
}

function formatarCEP(cep) {
    return cep.replace(/\D/g, '')
              .replace(/(\d{5})(\d)/, '$1-$2');
}

// Aplicar máscaras aos campos
document.addEventListener('DOMContentLoaded', function() {
    const telefoneInputs = document.querySelectorAll('input[type="tel"]');
    telefoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = formatarTelefone(this.value);
        });
    });
});

// WhatsApp Integration
function abrirWhatsApp(numero, mensagem = '') {
    const url = `https://wa.me/55${numero.replace(/\D/g, '')}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

// Adicionar botões de WhatsApp
document.addEventListener('DOMContentLoaded', function() {
    const whatsappLinks = document.querySelectorAll('.social-links a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const mensagem = 'Olá! Gostaria de solicitar uma cotação de transporte.';
            const numero = this.href.match(/\d+/)[0];
            abrirWhatsApp(numero, mensagem);
        });
    });
});

// Accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Skip link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const menuToggle = document.getElementById('menuToggle');
            const nav = document.getElementById('nav');
            
            if (nav && nav.classList.contains('active')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        }
    });
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce ao scroll
const debouncedAnimateOnScroll = debounce(animateOnScroll, 10);
window.removeEventListener('scroll', animateOnScroll);
window.addEventListener('scroll', debouncedAnimateOnScroll);
