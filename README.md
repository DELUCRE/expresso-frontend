# Expresso Itaporanga - Frontend

Interface web moderna e responsiva para o sistema de gestão de entregas da Expresso Itaporanga.

## Arquitetura

Este frontend foi desenvolvido seguindo as melhores práticas de desenvolvimento web moderno:

- **Arquitetura estática** com HTML5, CSS3 e JavaScript vanilla
- **Design responsivo** com Bootstrap 5
- **API-first approach** com comunicação REST
- **Progressive Enhancement** para melhor performance
- **Acessibilidade** seguindo padrões WCAG
- **SEO otimizado** com meta tags apropriadas

## Estrutura do Projeto

```
expresso-frontend/
├── public/
│   ├── index.html          # Página inicial
│   ├── servicos.html       # Página de serviços
│   ├── rastreamento.html   # Sistema de rastreamento
│   ├── sobre.html          # Sobre a empresa
│   ├── contato.html        # Formulário de contato
│   └── gestao/
│       ├── login.html      # Login administrativo
│       ├── dashboard.html  # Dashboard principal
│       ├── entregas.html   # Gestão de entregas
│       └── relatorios.html # Relatórios
├── assets/
│   ├── css/
│   │   └── style.css       # Estilos customizados
│   ├── js/
│   │   └── main.js         # JavaScript principal
│   └── images/             # Imagens e assets
├── src/                    # Código fonte (desenvolvimento)
├── docs/                   # Documentação
├── package.json           # Configuração Node.js
├── railway.json           # Configuração Railway
└── README.md              # Este arquivo
```

## Tecnologias

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos e animações
- **JavaScript ES6+** - Interatividade
- **Bootstrap 5** - Framework CSS responsivo
- **Font Awesome** - Ícones
- **Serve** - Servidor estático para deploy

## Funcionalidades

### Área Pública
- **Homepage** com apresentação da empresa
- **Rastreamento online** de entregas
- **Formulário de contato** integrado
- **Páginas informativas** (serviços, sobre)
- **Design responsivo** para todos os dispositivos

### Área de Gestão
- **Login seguro** com autenticação
- **Dashboard** com estatísticas em tempo real
- **Gestão de entregas** (CRUD completo)
- **Relatórios** e analytics
- **Interface administrativa** intuitiva

## Configuração

### Variáveis de Ambiente

O frontend se conecta automaticamente com a API backend. A URL da API é configurada em:

```javascript
// assets/js/main.js
const CONFIG = {
    API_BASE_URL: 'https://web-production-95d74.up.railway.app'
};
```

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Executar em modo produção
npm start
```

## Deploy

### Railway (Recomendado)

1. Conecte este repositório ao Railway
2. O deploy será automático usando Node.js
3. Configure domínio personalizado se necessário

### Outros Provedores

O projeto é compatível com:
- **Netlify** - Deploy automático via Git
- **Vercel** - Deploy otimizado para frontend
- **GitHub Pages** - Para projetos open source
- **AWS S3 + CloudFront** - Para alta disponibilidade

## Estrutura de Páginas

### Páginas Públicas

| Página | Arquivo | Descrição |
|--------|---------|-----------|
| Início | `index.html` | Homepage principal |
| Serviços | `servicos.html` | Serviços oferecidos |
| Rastreamento | `rastreamento.html` | Rastrear entregas |
| Sobre | `sobre.html` | Informações da empresa |
| Contato | `contato.html` | Formulário de contato |

### Área de Gestão

| Página | Arquivo | Descrição |
|--------|---------|-----------|
| Login | `gestao/login.html` | Autenticação |
| Dashboard | `gestao/dashboard.html` | Painel principal |
| Entregas | `gestao/entregas.html` | Gestão de entregas |
| Relatórios | `gestao/relatorios.html` | Analytics |

## API Integration

O frontend se comunica com o backend através de:

```javascript
// Exemplo de uso da API
const tracking = await ApiService.trackDelivery('EI12345678');
const stats = await ApiService.getDashboardStats();
```

### Endpoints Utilizados

- `GET /api/rastreamento/{codigo}` - Rastreamento público
- `POST /api/contato` - Formulário de contato
- `POST /api/auth/login` - Autenticação
- `GET /api/dashboard/stats` - Estatísticas
- `GET /api/entregas` - Listar entregas

## Performance

- **Lazy loading** de imagens
- **Minificação** de CSS e JS
- **Compressão** de assets
- **Cache** otimizado
- **CDN** para bibliotecas externas

## Segurança

- **HTTPS** obrigatório
- **CSP** (Content Security Policy)
- **Sanitização** de inputs
- **Validação** client-side e server-side
- **Autenticação** baseada em sessão

## Responsividade

- **Mobile-first** design
- **Breakpoints** otimizados
- **Touch-friendly** interface
- **Performance** em dispositivos móveis

## Browser Support

- **Chrome** 90+
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a MIT License.
