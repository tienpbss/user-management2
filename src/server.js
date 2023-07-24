require('dotenv').config();
require('express-async-errors');
const express = require('express');

const notFoundHandle = require('./middleware/notfound.middleware');
const errorHandler = require('./middleware/errorhandler.middleware');
const userRoutes = require('./routes/user.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

app.use(notFoundHandle);
app.use(errorHandler);


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})

