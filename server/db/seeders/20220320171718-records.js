// const fs = require('fs').promises;
// const path = require('path');

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     // const { identSeeds, recordsSeeds } = await csvData();

//     const jsonData = await fs.readFile(path.join(__dirname, '../../src/json.txt'), 'utf8');
//     const { identSeeds, recordsSeeds } = JSON.parse(jsonData);

//     await queryInterface.bulkInsert('Idents', identSeeds, {});
//     await queryInterface.bulkInsert('Records', recordsSeeds, {});
//   },

//   async down(queryInterface, Sequelize) {
//     await queryInterface.bulkDelete('Records', null, {});
//     await queryInterface.bulkDelete('Idents', null, {});
//   },
// };

const fs = require('fs');
const readline = require('readline');
const path = require('path');
const lineReader = readline.createInterface({
  input: fs.createReadStream(path.join(__dirname, '../../src/data.csv')),
});

module.exports = {
  async up(queryInterface, Sequelize) {

    const uniqueIdents = []

    lineReader.on('line', (line) => {
      const [ident, lat, lon, speed, device_timestamp, server_timestamp, direction] = line.split(',');
      if (ident === 'ident') return;
      await Ident.findOrCreate({ where: { ident } })
        .then(([identData]) => {
          const recordData = {
            identId: identData.id,
            lat: Number(lat) || null,
            lon: Number(lon) || null,
            speed: (speed) || null,
            device_timestamp: new Date(device_timestamp),
            server_timestamp: new Date(server_timestamp),
            direction: (direction) || null,
            createdAt: new Date(),
            updatedAt: new Date(),
          };
          return queryInterface.bulkInsert('Records', [recordData], {});
        });
    });
    // const { identSeeds, recordsSeeds } = await csvData();

    await new Promise((resolve, reject) => {
      lineReader.on('close', () => {
        resolve();
      });
    });
    // await queryInterface.bulkInsert('Idents', identSeeds, {});
    // await queryInterface.bulkInsert('Records', recordsSeeds, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Records', null, {});
    await queryInterface.bulkDelete('Idents', null, {});
  },
};
