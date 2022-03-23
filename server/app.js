const express = require('express');
require('dotenv').config();

const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const corsConfig = require('./config/corsConfig');

const loginRouter = require('./routes/loginRouter');
const checkUserRouter = require('./routes/checkUserRouter');
const identsRouter = require('./routes/identsRouter');
const routesRouter = require('./routes/routesRouter');
const authUser = require('./middleware/authUser');

const dbConnectionChecker = require('./helpers/dbConnectionChecker');

const app = express();

const PORT = process.env.PORT ?? 4000;

app.use(helmet());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors(corsConfig));
app.use(cookieParser());

app.use('/api/login', loginRouter);
app.use('/api/checkUser', authUser, checkUserRouter);
app.use('/api/idents', authUser, identsRouter);
app.use('/api/routes', authUser, routesRouter);

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

app.listen(PORT, () => {
  console.log('The server is connected');
  dbConnectionChecker();
});
