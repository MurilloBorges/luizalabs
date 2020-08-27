import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      title: 'Search CEP API',
      description: 'Search CEP API information',
      version: '1.0.0',
      contact: {
        name: 'Murillo Borges',
        email: 'murillo_borgess@hotmail.com',
      },
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
      servers: ['http://localhost:3333'],
    },
    host: 'localhost:3333',
    schemes: ['http'],
    basePath: '/',
    responses: {},
    parameters: {},
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
    },
    tags: [
      {
        name: 'Authenticate',
        description:
          'User authentication in the api, to generate the jwt token bearer',
      },
      {
        name: 'Users',
        description: 'User collection',
      },
      {
        name: 'CEP',
        description: 'Search address by zip code',
      },
    ],
    paths: {
      '/authenticate': {
        post: {
          tags: ['Authenticate'],
          summary: 'user authentication',
          operationId: 'userAuthentication',
          description: 'Here you can authenticate your user in the system',
          produces: ['application/json'],
          consumes: ['application/json'],
          parameters: [
            {
              in: 'body',
              name: 'user',
              description: 'user to authentication',
              required: true,
              schema: {
                $ref: '#/definitions/Authenticate',
              },
            },
          ],
          responses: {
            200: {
              description: 'user autenticated',
            },
            400: {
              description: 'object invalid || invalid password',
            },
            404: {
              description: 'user not found',
            },
            500: {
              description:
                'internal server error when trying to user authentication',
            },
          },
        },
      },
      '/usuarios': {
        post: {
          tags: ['Users'],
          summary: 'insert user',
          operationId: 'insertUser',
          description: 'Here you can register a new user in the system',
          produces: ['application/json'],
          consumes: ['application/json'],
          parameters: [
            {
              in: 'body',
              name: 'user',
              description: 'user to add',
              required: true,
              schema: {
                type: 'object',
                required: ['nome', 'email', 'senha'],
                properties: {
                  nome: {
                    $ref: '#/schemas/user/nome',
                  },
                  email: {
                    $ref: '#/schemas/user/email',
                  },
                  senha: {
                    $ref: '#/schemas/user/senha',
                  },
                },
              },
            },
          ],
          responses: {
            201: {
              description: 'user created',
            },
            400: {
              description: 'object invalid || existing user',
            },
            500: {
              description: 'internal server error when trying to create user',
            },
          },
        },
        get: {
          tags: ['Users'],
          summary: 'searches users',
          operationId: 'searchUsers',
          description:
            'When making a request, you can get all users registered in the system',
          produces: ['application/json'],
          responses: {
            200: {
              description: 'users were obtained',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/definitions/Users',
                  },
                },
              },
            },
            500: {
              description:
                'internal server error when trying to searches users',
            },
          },
        },
      },
      '/usuarios/{id}': {
        get: {
          tags: ['Users'],
          summary: 'searches user',
          operationId: 'searchUser',
          description:
            'By passing a valid ID, you can obtain the corresponding user',
          produces: ['application/json'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'user id',
              required: true,
              type: 'string',
            },
          ],
          responses: {
            200: {
              description: 'address obtained by zip code',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/definitions/CEP',
                  },
                },
              },
            },
            404: {
              description: 'user not found',
            },
            500: {
              description: 'internal server error when trying to searche user',
            },
          },
        },
        patch: {
          tags: ['Users'],
          summary: 'change user',
          operationId: 'changeUser',
          description:
            'By passing a valid ID, you can change the corresponding user',
          produces: ['application/json'],
          consumes: ['application/json'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'user id',
              required: true,
              type: 'string',
            },
            {
              in: 'body',
              name: 'user',
              description: 'user to change',
              required: true,
              schema: {
                type: 'object',
                required: ['nome', 'email', 'senha'],
                properties: {
                  nome: {
                    $ref: '#/schemas/user/nome',
                  },
                  senhaAntiga: {
                    $ref: '#/schemas/user/senha',
                  },
                  senha: {
                    $ref: '#/schemas/user/novaSenha',
                  },
                  senhaConfirmacao: {
                    $ref: '#/schemas/user/novaSenha',
                  },
                },
              },
            },
          ],
          responses: {
            204: {
              description: 'changed user',
            },
            400: {
              description:
                'invalid input path || object invalid || passwords do not match',
            },
            401: {
              description: 'unauthorized',
            },
            404: {
              description: 'user not found',
            },
            500: {
              description: 'internal server error when trying to change user',
            },
          },
        },
        delete: {
          tags: ['Users'],
          summary: 'delete user',
          operationId: 'deleteUser',
          description:
            'By passing a valid ID, you can delete the corresponding user',
          produces: ['application/json'],
          parameters: [
            {
              name: 'id',
              in: 'path',
              description: 'user id',
              required: true,
              type: 'string',
            },
          ],
          responses: {
            204: {
              description: 'deleted user',
            },
            401: {
              description: 'unauthorized',
            },
            404: {
              description: 'user not found',
            },
            500: {
              description: 'internal server error when trying to delete user',
            },
          },
        },
      },
      '/ceps': {
        get: {
          tags: ['CEP'],
          summary: 'searches CEP',
          operationId: 'searchCEP',
          description:
            'When you pass a valid zip code, you can obtain the corresponding address',
          produces: ['application/json'],
          parameters: [
            {
              name: 'cep',
              in: 'path',
              description: 'cep',
              required: true,
              type: 'string',
            },
          ],
          responses: {
            200: {
              description: 'search results matching criteria',
              schema: {
                type: 'object',
                $ref: '#/definitions/CEP',
              },
            },
            400: {
              description: 'invalid input path || invalid CEP',
              schema: {
                type: 'object',
                properties: {
                  cep: {
                    type: 'string',
                    description: 'postal code',
                    example: '150415',
                  },
                  error: {
                    type: 'string',
                    description: 'message',
                    example: 'CEP inválido',
                  },
                },
              },
            },
            401: {
              description: 'unauthorized',
            },
            404: {
              description: 'CEP not found',
              schema: {
                type: 'object',
                properties: {
                  cep: {
                    type: 'string',
                    description: 'postal code',
                    example: '10000002',
                  },
                  error: {
                    type: 'string',
                    description: 'message',
                    example: 'CEP não encontrado',
                  },
                },
              },
            },
            500: {
              description: 'internal server error when trying to query zip',
            },
          },
        },
      },
    },
    definitions: {
      Authenticate: {
        type: 'object',
        required: ['email', 'senha'],
        properties: {
          email: {
            $ref: '#/schemas/user/email',
          },
          senha: {
            $ref: '#/schemas/user/senha',
          },
        }
      },
      User: {
        type: 'object',
        properties: {
          _id: {
            $ref: '#/schemas/user/_id',
          },
          nome: {
            $ref: '#/schemas/user/nome',
          },
          email: {
            $ref: '#/schemas/user/email',
          },
          senha: {
            $ref: '#/schemas/user/senha',
          },
          createdAt: {
            $ref: '#/schemas/user/createdAt',
          },
          updatedAt: {
            $ref: '#/schemas/user/updatedAt',
          },
        },
      },
      Users: {
        type: 'object',
        properties: {
          users: {
            type: 'array',
            items: {
              $ref: '#/definitions/User',
            },
          },
        },
      },
      CEP: {
        properties: {
          cep: {
            $ref: '#/schemas/cep/cep',
          },
          state: {
            $ref: '#/schemas/cep/state',
          },
          city: {
            $ref: '#/schemas/cep/city',
          },
          neighborhood: {
            $ref: '#/schemas/cep/neighborhood',
          },
          street: {
            $ref: '#/schemas/cep/street',
          },
          service: {
            $ref: '#/schemas/cep/service',
          },
        },
      },
    },
    schemas: {
      user: {
        _id: {
          type: 'string',
          description: 'user id',
          example: '5f440f8e054f0e7dc1262f19',
        },
        nome: {
          type: 'string',
          description: 'user name',
          example: 'Murillo Borges',
        },
        email: {
          type: 'string',
          description: 'user email for authentication',
          example: 'murilloborges@luizalabs.com',
        },
        createdAt: {
          type: 'string',
          description: 'user creation date',
          format: 'date - time',
          example: '2020-08-24T19:05:50.793Z',
        },
        updatedAt: {
          type: 'string',
          description: 'date of last user change',
          format: 'date - time',
          example: '2020-08-24T19:05:50.793Z',
        },
        senha: {
          type: 'string',
          description: 'user password for authentication',
          example: '123456',
        },
        novaSenha: {
          type: 'string',
          description: 'new user password for authentication',
          example: 'd290f1ee',
        },
      },
      cep: {
        cep: {
          type: 'string',
          description: 'postal code',
          example: '15041530',
        },
        state: {
          type: 'string',
          description: 'state by cep',
          example: 'SP',
        },
        city: {
          type: 'string',
          description: 'city by cep',
          example: 'São José do Rio Preto',
        },
        neighborhood: {
          type: 'string',
          description: 'neighborhood by cep',
          example: 'Jardim Residencial Etemp',
        },
        street: {
          type: 'string',
          description: 'street by cep',
          example: 'Rua Archimedes Ary Beolchi',
        },
        service: {
          type: 'string',
          description: 'service search by cep',
          example: 'viacep',
        },
      },
    },
  },
  apis: ['.routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
