// const fs = require('fs');
// const { parse } = require('csv-parse');
// const path = require('path');

// const jsonArray = () => new Promise((resolve, reject) => {
//   const parser = parse({ columns: true, delimiter: ',' }, (err, records) => {
//     if (err) reject(err);
//     resolve(records);
//   });
//   fs.createReadStream(path.join(__dirname, '../src/data.csv')).pipe(parser);
// });

// async function csvData() {
//   const records = await jsonArray();
//   const uniqueIdent = {};
//   records.forEach((record) => {
//     const { ident } = record;
//     const counter = Object.keys(uniqueIdent).length + 1;
//     if (!uniqueIdent[ident]) uniqueIdent[ident] = counter;
//   });
//   const identSeeds = [];
//   Object.keys(uniqueIdent).forEach((identCode) => {
//     identSeeds.push({
//       ident: identCode,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     });
//   });

//   const recordsSeeds = records.map((record) => ({
//     identId: uniqueIdent[record.ident],
//     lat: Number(record.lat) || null,
//     lon: Number(record.lon) || null,
//     speed: (record.speed) || null,
//     device_timestamp: new Date(record.device_timestamp),
//     server_timestamp: new Date(record.server_timestamp),
//     direction: (record.direction) || null,
//     createdAt: new Date(),
//     updatedAt: new Date(),
//   }));
//   return { identSeeds, recordsSeeds };
// }

// csvData().then((json) => {
//   const jsonData = JSON.stringify(json);
//   fs.writeFile('json.txt', jsonData, (err) => {
//     if (err) {
//       console.log(err);
//     }
//   });
// });

const fs = require('fs');
const path = require('path');

const lineReader = require('readline').createInterface({
  input: fs.createReadStream(path.join(__dirname, '../src/data.csv')),
});

const idents = [];

lineReader.on('line', (line) => {
  const [ident, lat, lon, speed, device_timestamp, server_timestamp, direction] = line.split(',');
  if (!idents.includes(ident)) {
    idents.push(ident);
    console.log(ident);
  }
});
