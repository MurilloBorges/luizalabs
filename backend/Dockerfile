# Define a imagem a ser usada
FROM node:12
# Define a versão de yarn a ser usada
ENV YARN_VERSION 1.22.5
# Realiza os aceites de termos do yarn
RUN curl -fSLO --compressed "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-v$YARN_VERSION.tar.gz" \
    && tar -xzf yarn-v$YARN_VERSION.tar.gz -C /opt/ \
    && ln -snf /opt/yarn-v$YARN_VERSION/bin/yarn /usr/local/bin/yarn \
    && ln -snf /opt/yarn-v$YARN_VERSION/bin/yarnpkg /usr/local/bin/yarnpkg \
    && rm yarn-v$YARN_VERSION.tar.gz

# cria o subdiretório node_modules em /home/node juntamente com o diretório app.
# A criação desses diretórios garantirá que eles tenham as permissões que desejamos,
# o que será importante quando criarmos módulos de node locais no container com npm install.
# Além de criar esses diretórios, definiremos a propriedade deles para o nosso usuário node:
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

# define o diretório de trabalho da aplicação para
WORKDIR /home/node/app

# copia o arquivo package.json para o diretório
COPY package.json ./

# instala dependências do projeto
RUN yarn install

# Copie o código da aplicação para o diretório de trabalho da mesma no container:
COPY . .

# Para garantir que os arquivos da aplicação sejam de propriedade do usuário não-root node, copie as permissões do diretório da aplicação para o diretório no container:
COPY --chown=node:node . .

# Define o usuário para node
USER node

# Exponhe a porta 3333 no container da aplicação
EXPOSE 3333

# executa o comando para iniciar a aplicação - neste caso, node index.js (arquivo definido como main no package.json), yarn start (para iniciar a aplicação)
CMD ["yarn", "start" ]



