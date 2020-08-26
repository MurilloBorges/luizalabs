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
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
      },
      servers: ['http://localhost:3333'],
    },
    host: 'localhost:3333',
    schemes: ['https'],
    basePath: '/',
    paths: {},
    definitions: {},
    responses: {},
    parameters: {},
    securityDefinitions: {},
  },
  apis: ['.routes/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };
