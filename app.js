const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const customersRouter = require('./Routers/customersRouter')();
const teachersRouter = require('./Routers/teachersRouter')();
const cartRouter = require('./Routers/cartRouter')();
const classesRouter = require('./Routers/classesRouter')();
const cartProductRouter = require('./Routers/cartProductRouter')();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', customersRouter);
app.use('/api', teachersRouter);
app.use('/api', cartRouter);
app.use('/api', classesRouter);
app.use('/api', cartProductRouter);

app.server = app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

module.exports = app;