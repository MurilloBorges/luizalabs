# luizalabs
Expor um serviço de BUSCA DE CEP

Com esta aplicação irei informar meu CEP e obter o nome da minha RUA, BAIRRO, CIDADE e ESTADO para preencher meus dados de cadastro de forma automática.


# Tecnologias utilizadas
- Para o backend foi utilizado a linguagem NodeJS;

- Para o banco de dados onde será armazenado os usuários da aplicação foi utilizado o MongoDB;

- Para o frontend foi utilizado a linguagem ReactJS;

- Para os testes automaizados foi utilizado o framework cypress;

- Para documentação da API, foi utilizado o swagger;


# Por que NodeJS e não Java ?
1. Praticidade, agilidade, e facilidade de implementação;

2. A aplicação desenvolvida não exige um controle transacional e um backend robusto;

3. Poucas funcionalidades a serem implementadas;

4. Melhor performance para busca de dados, já que NodeJS transita json por padrão;

5. Melhor facilidade de manutenção do código pois existem mais profissionais familiarizados com o javascript/typescript;


# Estratégia utilizada
- A autenticação na api é realizada via token jwt, que é gerado ao realizar login na aplicação;
- Implementada collection de usuário contendo os métodos:
> - GET by id -> busca o usuário pelo id (não exige autenticação);

> - GET all -> busca todos os usuários (não exige autenticação);

> - POST -> insere um usuário (não exige autenticação);

> - DELETE -> exclui o usuário (exige autenticação);

> - PATCH -> altera os dados do usuário (exige autenticação);

- Os usuários da aplicação são armazenados no banco de dados MongoDB;

- Implementado método de busca cep (exige autenticação);



# Requisitos para a execução do projeto
- Ter o NodeJS instalado de preferência a última versão ou superior a v12.16.1;
> [Instalando o Node](https://nodejs.org/pt-br/download/package-manager/ "Clique aqui para aprender a instalar o Node!")

- Ter o gerenciador de dependências yarn instalado (npm também funciona, porém recomendo fortemente o yarn)
> [Instalando o yarn](https://classic.yarnpkg.com/pt-BR/docs/install/#debian-stable "Clique aqui para aprender a instalar o yarn!")


## Documentação da API offline
> [Documentação da API offline](https://app.swaggerhub.com/apis/MurilloBorges/search-cep_api/1.0.0 "Clique aqui para ver a documentação!")


## Executando o projeto
1. Acessar a pasta backend e executar os seguintes comandos:
> yarn install

> yarn start (obs: configurar o arquivo .env na raiz da pasta backend: copiar conteúdo do .env.example)

> com a api no ar, consulte a documentação, acessando o endpoint: http://localhost:3333/api-docs/

> divirta-se com as funcionalidades


2. Acessar a pasta frontend e executar os seguintes comandos:
> yarn install

> yarn start (obs: configurar o arquivo .env na raiz da pasta frontend: copiar conteúdo do .env.example)

> usuário para testes da aplicação (porém você poderá cadastrar um usuário)
> > murilloborges@luizalabs.com

> > 123456

> divirta-se com as funcionalidades
