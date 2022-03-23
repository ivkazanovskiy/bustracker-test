const router = require('express').Router();
const { Ident } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    try {
      const allIdents = await Ident.findAll({ raw: true, attributes: ['id', 'ident'] });
      res.status(200).json(allIdents);
    } catch (err) {
      res.sendStatus(500);
    }
  });

module.exports = router;
