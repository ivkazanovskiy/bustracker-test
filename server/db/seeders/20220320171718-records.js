const fs = require('fs');
const readline = require('readline');
const path = require('path');
const { Ident } = require('../models');

const lineReader = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, '../../src/data.csv')),
});

module.exports = {
  async up(queryInterface, Sequelize) {
    const allIdents = await Ident.findAll({ raw: true, attributes: ['id', 'ident'] });

    const recordsSeeds = [];

    lineReader.on('line', (line) => {
      const [ident, lat, lon, speed, device_timestamp, server_timestamp, direction] = line.split(',');
      if (ident === 'ident') return;
      const identId = allIdents.find((elem) => elem.ident === ident).id;

      const recordData = {
        identId,
        lat: Number(lat) || null,
        lon: Number(lon) || null,
        speed: (speed) || null,
        device_timestamp: new Date(device_timestamp),
        server_timestamp: new Date(server_timestamp),
        direction: (direction) || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      recordsSeeds.push(recordData);
    });
    await new Promise((resolve, reject) => {
      lineReader.on('close', () => {
        resolve();
      });
    });

    await queryInterface.bulkInsert('Records', recordsSeeds, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Records', null, {});
  },
};
