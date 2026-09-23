import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'NerdCornerAPI',
    description: 'Auto-generated Swagger documentation',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const routes = ['./index.js', './src/routes/*.js'];
swaggerAutogen()(outputFile, routes, doc);



// swaggerJsdoc config //

// import swaggerJsdoc from 'swagger-jsdoc';

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'NerdCornerAPI',
//       version: '1.0.0',
//     },
//   },
//   apis: ['./src/routes/*.js', './index.js'],
// };

// swaggerJsdoc(options);

/**
 * @openapi
 * /:
 *   get:
 *     description: Hello, Express!
 *     responses:
 *       200:
 *         description: Returns a greeting string.
 */
// Specific endpoint (route)