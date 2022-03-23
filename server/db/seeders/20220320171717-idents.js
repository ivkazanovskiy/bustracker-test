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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Idents', null, {});
  },
};
