# Desafio Fullstack.

<h3>Desafio consiste em desenvolver um aplicativo de gerenciamento de solicitações para venda de produtos de escritório, com o backend em NodeJS e o front end em Angular.</h3>
O sistema possui 3 tipos distintos de usuários: <br>
Requisitante: responsável por solicitar produtos, informando nome do requisitante, descrição do produto e preço <br>
Almoxarife: responsável por aceitar ou recusar as solicitações 
<br>
Administrador: responsável por consultar as solicitações e qual seu estado atual, pode filtrar por nome, descrição ou status.

# Setup do sistema

<h3>Entre na pasta que deseja utilizar para o sistema e:

```git clone https://github.com/DrZebraZ/Desafio-Senior.git```

```cd Desafio-Senior```

<h3>Backend:</h3>

1 - subir banco
```docker-compose up -d```

2 - instalar pacotes
```cd api && npm i```

3 - copiar environment
```cp .env.example .env ```

4 - editar as variáveis do .env
- DATABASE_URL = URL para acesso ao banco de dados (ja configurado)
- ADM_USERNAME = usuario admin criado ao iniciar o servidor
- ADM_PASSWORD = senha do admin
- JWTKEY = chave para criação dos tokens JWT

5 - rodar migrations
```npx prisma migrate dev -n db```

6 - rodar servidor backend
```npm run start:dev```

Agora o servidor está rodando, com o administrador criado (apenas com seu token é possivel criar novos usuários)

<h3>FrontEnd:</h3>

Abra um novo terminal para rodar o FrontEnd agora

Navegue até a pasta app-desafio

1 - instalar pacotes
``` npm install ```

2 - rodar Angular
``` ng serve```



# Sobre o Sistema

O Frontend estará rodando em <a>http://localhost:4200</a>
O Backend estará rodando na porta 3000

Para logar inicialmente no sistema basta colocar os dados de ADM_USERNAME e ADM_PASSWORD informados no .env do backend

O sistema consta com 4 rotas principais
<a>http://localhost:4200/login</a>  - todos podem usar
<a>http://localhost:4200/solicitar</a> - apenas usuarios solicitante e admin
<a>http://localhost:4200/almox</a> - apenas usuarios almoxarife e admin
<a>http://localhost:4200/admin</a> - apenas admin

Ao logar com cada tipo de conta será redirecionado para sua respectiva rota automaticamente.
Na rota /admin é possivel criar novos usuarios informando seu nome, senha e qual seu cargo (role)

No almoxarife para aprovar ou recusar uma solicitação basta clicar em cima da solicitação e continuar o fluxo normalmente.

Não é possivel executar tarefas que não pertençam a sua role, tanto no front (paginas) quanto no backend (requisições) é validado seu token para saber se há permissão para aquela rota.