const jwt = require('jsonwebtoken');

function authUser(req, res, next) {
  const header = req.headers.authorization;
  const [name, userToken] = header && header.split(' ');

  if (userToken == null) return res.sendStatus(401);

  jwt.verify(userToken, process.env.ACCESS_TOKEN_SECRET, (err, token) => {
    if (err) return res.sendStatus(403);
    req.user = token;
    next();
  });
}

module.exports = authUser;
