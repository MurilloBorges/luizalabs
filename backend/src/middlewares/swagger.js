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
    securityDefinitions: {},
    tags: [
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
      '/usuarios': {
        post: {
          tags: ['Users'],
          summary: 'insert user',
          operationId: 'insertUser',
          description: 'Here you can register a new user in the system',
          produces: ['application / json'],
          consumes: ['application / json'],
          parameters: [
            {
              in: 'body',
              name: 'user',
              description: 'user to add',
              required: false,
              schema: {
                $ref: '#/definitions/User',
              },
            },
          ],
          responses: {
            201: {
              description: 'user created',
            },
            400: {
              description: 'invalid input, object invalid || existing user ',
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
          produces: ['application / json'],
          responses: {
            200: {
              description: 'Users were obtained',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/definitions/Users',
                  },
                },
              },
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
          produces: ['application / json'],
        },
        patch: {
          tags: ['Users'],
          summary: 'change user',
          operationId: 'changeUser',
          description:
            'By passing a valid ID, you can change the corresponding user',
          produces: ['application / json'],
          consumes: ['application / json'],
        },
        delete: {
          tags: ['Users'],
          summary: 'delete user',
          operationId: 'deleteUser',
          description:
            'By passing a valid ID, you can delete the corresponding user',
          produces: ['application / json'],
        },
      },
      '/ceps': {
        get: {
          tags: ['CEP'],
          summary: 'searches CEP',
          operationId: 'searchCEP',
          description:
            'When you pass a valid zip code, you can obtain the corresponding address',
          produces: ['application / json'],
          // parameters: {
          //   - in: query
          //   name: searchString
          //   description: pass an optional search string for looking up inventory
          //   required: false
          //   type: string
          //   - in: query
          //   name: skip
          //   description: number of records to skip for pagination
          //   type: integer
          //   format: int32
          //   minimum: 0
          //   - in: query
          //   name: limit
          //   description: maximum number of records to return
          //   type: integer
          //   format: int32
          //   minimum: 0
          //   maximum: 50
          // }
          responses: {
            200: {
              description: 'search results matching criteria',
              schema: {
                type: 'array',
                items: {
                  $ref: '#/definitions/CEP',
                },
              },
            },
            400: {
              description: 'bad input parameter',
              // content: 'application/json',
              // schema: {
              //   $ref: '#/definitions/CEPError',
              // },
              schema: {
                cep: '999999',
                error: 'CEP inválido',
              },
            },
            401: {
              description: 'Unauthorized',
            },
            404: {
              description: 'CEP not found',
            },
            500: {
              description: 'internal server error',
            },
          },
        },
      },
    },
    definitions: {
      User: {
        type: 'object',
        required: ['nome', 'email'],
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
