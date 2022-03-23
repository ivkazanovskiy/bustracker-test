const fs = require('fs');
const rl = require('readline');
const path = require('path');
const { Ident, Record } = require('../models');

const readStream = fs.createReadStream(path.join(__dirname, '../../src/data.csv'));
const lineReader = rl.createInterface({
  input: readStream,
});

module.exports = {
  async up(queryInterface, Sequelize) {
    const allIdents = await Ident.findAll({ raw: true, attributes: ['id', 'ident'] });

    let counter = 0;
    const maxCounter = 1000;
    let recordsPack = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const line of lineReader) {
      const [ident, lat, lon, speed, device_timestamp, server_timestamp, direction] = line.split(',');
      if (ident === 'ident') return;

      counter += 1;
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

      recordsPack.push(recordData);

      if (counter >= maxCounter) {
        await queryInterface.bulkInsert('Records', recordsPack, {});
        counter = 0;
        recordsPack = [];
      }
    }

    if (recordsPack.length > 0) {
      await queryInterface.bulkInsert('Records', recordsPack, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Records', null, {});
  },
};
