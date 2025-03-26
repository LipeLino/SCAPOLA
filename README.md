# Scapola CMS - Sistema de Gerenciamento de Conteúdo

Este projeto é um sistema de gerenciamento de conteúdo (CMS) personalizado para o site da Scapola Comunica, uma agência de PR e comunicação. O sistema permite gerenciar marcas parceiras e publicações de blog através de um painel administrativo seguro.

## Sobre o Projeto

Desenvolvido pelo time de TI da **Avance - Consultoria Júnior** (Empresa Júnior Multidisciplinar da UEMG Frutal), o Scapola CMS foi criado especificamente para atender às necessidades de gestão de conteúdo da Scapola Comunica, possibilitando que a equipe atualize o site de forma intuitiva e eficiente.

## Tecnologias

- **Next.js**: Framework React para renderização do lado do servidor e criação de APIs
- **TypeScript**: Tipagem estática para desenvolvimento mais seguro
- **MySQL**: Banco de dados relacional
- **NextAuth.js**: Sistema completo de autenticação e autorização
- **TailwindCSS**: Framework CSS para design responsivo
- **React Quill**: Editor rich text para criação de conteúdo
- **Formidable/Multer**: Manipulação de uploads de arquivos
- **Basic-FTP**: Transferência de arquivos para servidor remoto

## Funcionalidades

O sistema inclui as seguintes funcionalidades:

### Autenticação e Autorização
- Sistema seguro de login de administrador
- Proteção de rotas administrativas
- Gerenciamento de sessões com tokens JWT

### Gerenciamento de Conteúdo
- **Marcas**: Adicionar, editar e excluir marcas parceiras, incluindo upload de logos
- **Blog**: Criar, editar e excluir publicações de blog com editor rich text
- **Categorias**: Organizar posts por categorias personalizáveis
- **Upload de imagens**: Gestão de imagens para posts e marcas

### API RESTful
- Endpoints para gerenciar todos os recursos
- Autenticação via NextAuth
- Documentação completa disponível em [API.md](./API.md)

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/scapola/scapola-cms.git
cd scapola-cms
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:
```
# Autenticação
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=seu-segredo-jwt-aleatorio
SETUP_KEY=chave-de-configuracao-inicial

# Banco de dados
DB_HOST=localhost
DB_USER=usuario
DB_PASS=senha
DB_NAME=scapola

# Email (opcional, para notificações)
EMAIL_HOST=smtp.exemplo.com
EMAIL_PORT=587
EMAIL_USER=usuario@exemplo.com
EMAIL_PASS=senha-do-email
EMAIL_TO_PRIMARY=destino@exemplo.com
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

5. Configure a conta de administrador visitando:
```
http://localhost:3000/admin/setup
```
Use a SETUP_KEY definida nas variáveis de ambiente para criar o administrador.

## Estrutura do Projeto

- `/app`: Rotas e páginas da aplicação (Next.js App Router)
  - `/api`: Endpoints da API REST
  - `/(site)`: Páginas públicas do site
  - `/admin`: Páginas do painel administrativo
- `/components`: Componentes React reutilizáveis
- `/lib`: Utilitários e funções auxiliares
  - `db.ts`: Conexão com banco de dados
- `/types`: Definições de tipos TypeScript
- `/utils`: Funções utilitárias
- `/public`: Arquivos estáticos e uploads

## Implantação

Para implantar em produção:

1. Construa a aplicação:
```bash
npm run build
# ou
yarn build
```

2. Inicie o servidor de produção:
```bash
npm start
# ou
yarn start
```

## Integração FTP

O sistema utiliza o protocolo FTP para upload de imagens. As imagens são armazenadas em um servidor FTP configurado nas variáveis de ambiente. Os uploads são realizados através da biblioteca `basic-ftp`.

## Segurança

- As senhas são armazenadas com hash usando bcrypt
- A autenticação é gerenciada por NextAuth.js com tokens JWT
- Todas as rotas da API verificam a sessão do usuário antes de permitir acesso

## Equipe de Desenvolvimento

- Mateus Lino (@LipeLino)
- Myke Matos (@shishiv)
- Pedro Henrique (@Pedro)
- Rodrigo Salgado (@Rodrigo)

## Suporte

Para suporte, entre em contato com a equipe da Avance Consultoria Júnior ou abra uma issue neste repositório.
