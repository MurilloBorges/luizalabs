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
- > GET by id -> busca o usuário pelo id (não exige autenticação);

- > GET all -> busca todos os usuários (não exige autenticação);

- > POST -> insere um usuário (não exige autenticação);

- > DELETE -> exclui o usuário (exige autenticação);

- > PATCH -> altera os dados do usuário (exige autenticação);

- Os usuários da aplicação são armazenados no banco de dados MongoDB;

- Implementado método de busca cep (exige autenticação);
