class RecordsParser {
  #records;

  static #gap(coord1, coord2) {
    if (!coord2) return 0;
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;
    const earthRadius = 6371000; // metres
    const latDiff = lat2 - lat1;
    const lonDiff = lon2 - lon1;
    const degToRad = Math.PI / 180;

    const degGap = 2 * Math.asin(
      Math.sqrt(
        Math.sin((latDiff / 2) * degToRad) ** 2
        + Math.cos(lat1 * degToRad)
        * Math.cos(lat2 * degToRad)
        * Math.sin((lonDiff / 2) * degToRad) ** 2,
      ),
    );

    return degGap * earthRadius;
  }

  constructor(records) {
    this.#records = records;
    this.path = this.#records.map((record) => [record.lat, record.lon]);
  }

  maxSpeed() {
    return Math.max(...this.#records.map((record) => record.speed));
  }

  distance() {
    const fulldistance = this.path.reduce(
      (acc, coord, index, array) => acc + RecordsParser.#gap(coord, array[index + 1]),
      0,
    );
    return Math.round(fulldistance);
  }

  bounds() {
    let [maxLat, maxLon] = this.path[0];
    let [minLat, minLon] = this.path[0];
    this.path.forEach((coordinates) => {
      const [curLat, curLon] = coordinates;
      maxLat = Math.max(maxLat, curLat);
      maxLon = Math.max(maxLon, curLon);
      minLat = Math.min(minLat, curLat);
      minLon = Math.min(minLon, curLon);
    });

    return [[minLat, minLon], [maxLat, maxLon]];
  }
}

module.exports = RecordsParser;
