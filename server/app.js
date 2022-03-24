const express = require('express');
require('dotenv').config();

const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const {
  expressCspHeader, SELF, INLINE,
} = require('express-csp-header');

const loginRouter = require('./routes/loginRouter');
const checkUserRouter = require('./routes/checkUserRouter');
const identsRouter = require('./routes/identsRouter');
const routesRouter = require('./routes/routesRouter');
const authUser = require('./middleware/authUser');

const dbConnectionChecker = require('./helpers/dbConnectionChecker');

const app = express();

const PORT = process.env.PORT ?? 4000;

app.use(expressCspHeader({
  directives: {
    'script-src': [SELF, INLINE, 'https://api-maps.yandex.ru', 'https://yastatic.net'],
  },
}));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
