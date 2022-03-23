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
    const uniqueIdents = [];

    lineReader.on('line', (line) => {
      const [ident] = line.split(',');
      if (ident === 'ident') return;
      if (!uniqueIdents.includes(ident)) uniqueIdents.push(ident);
    });

    await new Promise((resolve) => {
      lineReader.on('close', () => {
        resolve();
      });
    });

    const identSeeds = uniqueIdents.map((ident) => (
      {
        ident,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ));

    await queryInterface.bulkInsert('Idents', identSeeds, {});
    // await queryInterface.bulkInsert('Records', recordsSeeds, {});
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('Records', null, {});
    await queryInterface.bulkDelete('Idents', null, {});
  },
};
