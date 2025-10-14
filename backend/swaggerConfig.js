// swaggerConfig.js
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0', // Specify the OpenAPI version
    info: {
      title: 'EPICS API',
      version: '1.0.0',
      description: 'Farmers Helping APi',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Your API base URL
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js','./main.js','./app.js'], // Path to your API route files containing JSDoc comments
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec