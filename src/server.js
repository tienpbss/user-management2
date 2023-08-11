require('dotenv').config();
require('express-async-errors');
require('./models')


const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const notFoundHandle = require('./middleware/notfound.middleware');
const errorHandler = require('./middleware/errorhandler.middleware');
const userRoutes = require('./routes/user.routes');
const formRoutes = require('./routes/form.routes');
const roleRoutes = require('./routes/role.routes');
const formSubmitRoutes = require('./routes/form-submit.routes');
const permissionRoutes = require('./routes/permission.routes');

const app = express()

//body parse
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//hello word
app.get('/', (req, res) => {
  /*  #swagger.tags = ['Hello word']
      #swagger.description = 'Endpoint example' */
  res.send('Hello World!')
})

//routes
app.use('/users', userRoutes
  /**
   * #swagger.tags = ['User']
   */
);
app.use('/roles', roleRoutes
  /**
   * #swagger.tags = ['Role']
   */
);
app.use('/permissions', permissionRoutes
  /**
   * #swagger.tags = ['Permission']
   */
);
app.use('/forms', formRoutes
  /**
   * #swagger.tags = ['Form']
   */
);
app.use('/formSubmits', formSubmitRoutes
  /**
   * #swagger.tags = ['FormSubmit']
   */
);

//swagger
// const options = {
//   definition: {
//     openapi: "3.1.0",
//     info: {
//       title: "LogRocket Express API with Swagger",
//       version: "0.1.0",
//       description:
//         "This is a simple CRUD API application made with Express and documented with Swagger",
//       license: {
//         name: "MIT",
//         url: "https://spdx.org/licenses/MIT.html",
//       },
//       contact: {
//         name: "LogRocket",
//         url: "https://logrocket.com",
//         email: "info@email.com",
//       },
//     },
//     servers: [
//       {
//         url: "http://localhost:3000",
//       },
//     ],
//   },
//   apis: ["./src/routes/*.js"],
// };
// const specs = swaggerJsdoc(options);
// app.use(
//   "/api-docs",
//   swaggerUi.serve,
//   swaggerUi.setup(specs, { explorer: true })
// );

const swaggerFile = require('./swagger_output.json')
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile, { explorer: true }))



//middleware not found, error
app.use(notFoundHandle);
app.use(errorHandler);

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

