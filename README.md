# luizalabs
Expor um serviço de BUSCA DE CEP

Com esta aplicação irei informar meu CEP e obter o nome da minha RUA, BAIRRO, CIDADE e ESTADO para preencher meus dados de cadastro de forma automática.


# Tecnologias utilizadas
- Para o backend foi utilizado a ferramenta NodeJS;

- Para o banco de dados onde será armazenado os usuários da aplicação foi utilizado o MongoDB;

- Para o frontend foi utilizado a ferramenta ReactJS;

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

#### Para a arquitetura do projeto foi utilizado o seguinte contexto de pastas:
> **luizalabs** (pasta pai de todo o projeto)

> > **backend** (pasta pai do backend)

> > > **node_modules** (pasta onde contém todas bibliotecas e dependências instaladas e utilizadas no projeto)

> > > **logs** (pasta onde contém o log de todas as requisições feitas para a api)

> > > **src** (pasta onde contém a arquitetura da api)

> > > > **middlewares** (contém os middlewares da aplicação com o logger para log das requisições da api, swagger para documentaço, auth para validação de token jwt válido)

> > > > **views** (contém as views da aplicação como endereço que retorna o modelo "json padrão" de endereço para retorno no response da requisição de cep para status 200)

> > > > **controllers** (contém os controllers da aplicação ou seja onde fica toda regra de negócio para cada método/endpoint a ser consumido/publicado, isso inclui tratativas de erros, lógica de negócio, regras, e define a resposta e status do response a ser encaminhada para o client)

> > > > **models** (contém os modelos/estruturas dos objetos que teram vinculo e serão armazenados no banco de dados, exmplo model de usuário, contém a definiçao dos campos requiridos, tipagem, tamanho, e também regras como não trazer a senha do usuário do banco de dados e criptografar a mesma antes de ser inserida na base)

> > > > **helpers** (contém funções auxiliares que serão utilizadas em diversos lugares da aplicação, exemplo isNotEmpty que valida se um valor não é indefinido, nulo ou vazio)

> > > > **database** (contém a classe que instancia as configurações de conexão com o banco de dados e export um objeto de conexão criado e pronto para uso)

> > > > **config** (contém arquivos de configuração da aplicação, como database onde fica toda configuração de conexão com o banco de dados e auth onde fica o segredo para geração do token jwt e o tempo de expiração)

> > > > **routes.js** (define as rotas da api e também a partir de qual rota o token jwt é obrigatório)

> > > > **app.js** (define toda configuração e funcionalidades que o server utilizara para rodar a aplicação, sendo isso, express, middlewares, cors, routes, e instancia um server novo)

> > > > **server.js** (define a porta em que a aplicação será executada e mais algumas funcionalidades)



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
