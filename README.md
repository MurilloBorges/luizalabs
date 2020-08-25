# luizalabs
Expor um serviço de BUSCA DE CEP

Eu, como usuário, quero informar meu CEP e obter o nome da minha RUA, BAIRRO, CIDADE e ESTADO para preencher meus dados de cadastro de forma automática.


# Tecnologias utilizadas
- Para o backend será utilizada a linguagem Node js;

- Para o banco de dados onde será armazenado os usuários da aplicação será utilizado o MongoDB;

- Para o frontend será utilizada a linguagem React js;

- Para os testes automaizados será utilizada o framework cypress;

- Para documentação da API, será utilizado o swagger;


# Por que Node js e não Java ?
1. Praticidade, agilidade, e facilidade de implementação;

2. A aplicação desenvolvida não exige um controle transacional e um backend robusto;

3. Poucas funcionalidade a serem implementadas;

4. Melhor performance para busca de dados;


# Estratégia utilizada
- A autenticação na api é realizada via token jwt, que é gerado ao realizar login na aplicação;
- Implementada collection de usuário contendo os métodos:
- > GET by id -> busca o usuário pelo id (não exige autenticação);

- > GET all -> busca todos os usuários (não exige autenticação);

- > POST -> insere um usuário (não exige autenticação);

- > DELETE -> exclui o usuário (exige autenticação);

- > PATCH -> altera os dados do usuário (exige autenticação);

- Os usuários da aplicação é armazenado no banco de dados MongoDB;
