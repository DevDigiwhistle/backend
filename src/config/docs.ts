import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Digiwhistle API',
    description: 'Description'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./src/v1/auth/routes'];


swaggerAutogen()(outputFile, routes, doc);