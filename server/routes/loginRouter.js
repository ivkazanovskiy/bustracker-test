const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../db/models');
const { isValidUser } = require('../helpers/isValid');
const userAttributes = require('../helpers/userAttributes');

router.route('/')
  .post(async (req, res) => {
    if (!isValidUser(req.body)) return res.sendStatus(400);
    const { email, password } = req.body;

    try {
      const user = await User.findOne({
        where: { email },
      });

      if (!user) return res.sendStatus(403);

      if (await bcrypt.compare(password, user.password)) {
        const info = userAttributes(user);
        const token = jwt.sign(info, process.env.ACCESS_TOKEN_SECRET);
        return res.status(200).json({ token });
      }

      // incorrect password
      return res.sendStatus(401);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });
module.exports = router;
