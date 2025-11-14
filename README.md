Gerenciador de Posts - Angular
Uma aplicação Angular completa para gerenciar posts e comentários, consumindo a API pública JSONPlaceholder.

🚀 Demo Online
🔗 Link do Deploy: https://main.d2l48wzxhjxj2i.amplifyapp.com/posts

📂 Repositório: https://github.com/joao-chass/posts

📋 Requisitos Implementados
✅ Funcionalidades Principais
CRUD completo de Posts (Create, Read, Update, Delete)

CRUD de Comentários relacionados aos posts

Modal de edição para título e corpo do post

Confirmação antes de excluir posts

Cache in-memory com atualizações otimistas

Tabela com paginação, ordenação e busca

Tratamento de estados (loading, error, success)

Design responsivo com Tailwind CSS

Acessibilidade básica implementada

✅ Requisitos Técnicos
Angular 19 com componentes standalone

RxJS para operações assíncronas

Signals para estado reativo

Interceptors para base URL e tratamento de erros

Tipagem forte com interfaces TypeScript

Roteamento com lazy loading

🛠 Como Executar o Projeto
Pré-requisitos
Node.js 18+

npm ou yarn

Angular CLI 19+

📥 Instalação
bash
# Clone o repositório
git clone https://github.com/joao-chass/posts.git
cd posts

# Instale as dependências
npm install

# Execute em modo desenvolvimento
ng serve

# Acesse no navegador
# http://localhost:4200
🏗 Comandos de Build
bash
# Build de produção
ng build --configuration=production

# Executar testes unitários
ng test

# Verificar qualidade do código
ng lint
🏗 Arquitetura do Projeto

🔧 Padrões Arquiteturais
Componentes Standalone: Cada componente é independente e auto-suficiente

Services com Signals: Estado reativo com cache in-memory

Feature-based Structure: Organização por funcionalidades

Reactive Programming: RxJS para operações assíncronas e HTTP

Separation of Concerns: Separação clara entre lógica de negócio e UI

⚡ Decisões Técnicas e Trade-offs
1. Gerenciamento de Estado: Signals vs Observables
Decisão: Signals para estado local, Observables para operações assíncronas

Trade-off: Curva de aprendizado inicial, mas melhor performance e código mais limpo

Benefício: Reatividade granular e menos boilerplate

2. Cache e Atualizações Otimistas
Decisão: Implementar cache in-memory com rollback em caso de erro

Trade-off: Complexidade adicional no tratamento de erros

Benefício: UX mais rápida e responsiva

3. Styling: Tailwind CSS
Decisão: Utilizar Tailwind CSS em vez de CSS tradicional ou outros frameworks

Trade-off: Classes verbosas no HTML, mas desenvolvimento mais rápido

Benefício: Design system consistente e altamente customizável

4. Arquitetura: Standalone Components
Decisão: Migrar para componentes standalone do Angular

Trade-off: Não usar NgModules tradicional

Benefício: Bundle menor e mais flexibilidade na organização do código

5. Deploy: AWS Amplify
Decisão: Utilizar AWS Amplify para deploy contínuo

Trade-off: Configuração específica da plataforma

Benefício: Integração direta com GitHub e deploy automático

🧪 Como Testar a Aplicação
🔍 Testes Manuais
1. Listagem de Posts (/posts)
✅ Navegue pela paginação

✅ Teste ordenação por ID e Título

✅ Use a busca em tempo real

✅ Verifique os estados de loading

✅ Teste em diferentes tamanhos de tela

2. Operações CRUD de Posts
✅ Criar: Clique em "Create Post" e preencha o formulário

✅ Editar: Clique em "Edit" em qualquer post (modal)

✅ Deletar: Clique em "Delete" e confirme a ação

✅ Visualizar: Clique em "View" para ver detalhes

3. Gerenciamento de Comentários
✅ Acesse detalhes de um post

✅ Adicione novos comentários

✅ Teste a exclusão de comentários

✅ Verifique validação do formulário

4. Feedback do Sistema
✅ Observe os toasts de sucesso/erro

✅ Teste tratamento de erros de rede

✅ Verifique estados de loading

🚀 Testes Automatizados
bash
# Executar testes unitários
ng test

# Executar testes com coverage
ng test --code-coverage

# Executar em modo watch
ng test --watch
🎨 Design System
🎯 Cores (Tailwind CSS)
Primária: blue-500, blue-600 (hover)

Sucesso: green-500, green-600

Erro: red-500, red-600

Aviso: yellow-500, yellow-600

Neutro: gray-100, gray-200, gray-500, gray-700

📱 Componentes de UI
Toasts: Notificações temporárias para feedback

Modais: Confirmação e edição

Loading Spinners: Indicadores de carregamento

Tabelas: Com ordenação e paginação

Formulários: Com validação e estados

🔄 Fluxo de Dados






📈 Próximas Melhorias
Testes E2E com Cypress

PWA capabilities (service workers, offline support)

Internacionalização (i18n) com múltiplos idiomas

Dashboard com métricas e analytics

Exportação de dados (JSON, CSV)

Modo escuro toggle

Upload de imagens para posts

Sistema de favoritos para posts

🔧 Tecnologias Utilizadas
Frontend: Angular 19, TypeScript, RxJS, Signals

Styling: Tailwind CSS, Responsive Design

HTTP Client: Angular HttpClient + Interceptors

Deploy: AWS Amplify, GitHub Actions

API: JSONPlaceholder (REST API)

Ferramentas: Angular CLI, ESLint, Prettier

👥 Contribuição
Faça o fork do projeto

Crie uma branch para sua feature (git checkout -b feature/amazing-feature)

Commit suas mudanças (git commit -m 'Add some amazing feature')

Push para a branch (git push origin feature/amazing-feature)

Abra um Pull Request

📄 Licença
Este projeto foi desenvolvido para fins educacionais e utiliza a API pública JSONPlaceholder.
