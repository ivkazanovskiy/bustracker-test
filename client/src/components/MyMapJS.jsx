import React, { useEffect } from 'react';

function MyMapJS({ routData }) {

  const polyOptions = {
    strokeColor: '#1a56db',
    strokeWidth: 4,
  }

  const mapData = {
    bounds: routData.bounds
  };

  useEffect(() => {
    if (window.ymaps) {
      window.ymaps.ready(init)
    }
  }, [])

  function init() {
    const myMap = new window.ymaps.Map("map", mapData);
    const polyline = new window.ymaps.Polyline(routData.path, {}, polyOptions);
    myMap.geoObjects.add(polyline);
    myMap.setBounds(polyline.geometry.getBounds());
  }

  return (
    <div id="map" className="w-full h-full shadow-lg"></div>
  );
}

export default MyMapJS;
