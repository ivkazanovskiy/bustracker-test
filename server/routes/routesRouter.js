const router = require('express').Router();
const { Op } = require('sequelize');
const { Record } = require('../db/models');
const RecordsParser = require('../helpers/RecordsParser');

router.route('/')
  .get(async (req, res) => {
    const { identId, date } = req.query;

    const previousDate = new Date(date);
    const nextDate = new Date(previousDate.getTime() + 24 * 60 * 60 * 1000);

    try {
      const allRecords = await Record.findAll({
        raw: true,
        order: ['device_timestamp'],
        attributes: ['lat', 'lon', 'speed', 'device_timestamp'],
        where: {
          device_timestamp: {
            [Op.gt]: previousDate,
            [Op.lt]: nextDate,
          },
          identId,
          [Op.and]: [
            { lat: { [Op.not]: null } },
            { lon: { [Op.not]: null } }],
        },
      });

      if (allRecords.length === 0) return res.sendStatus(204);

      const recordsData = new RecordsParser(allRecords);
      const responseJson = {
        path: recordsData.path,
        maxSpeed: recordsData.maxSpeed(),
        distance: recordsData.distance(),
        bounds: recordsData.bounds(),
      };

      res.status(200).json(responseJson);
    } catch (err) {
      res.sendStatus(500);
    }
  });

module.exports = router;
