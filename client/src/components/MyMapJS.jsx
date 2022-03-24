import React, { useEffect, useLayoutEffect } from 'react';

function MyMapJS({ routData }) {

  const polyOptions = {
    strokeColor: '#1a56db',
    strokeWidth: 4,
  }

  const mapData = {
    bounds: routData.bounds
  };




  // useEffect(() => {
  //   window.addEventListener('load', handleLoad);
  //   return window.removeEventListener('load', handleLoad);
  // }, [])


  // function handleLoad() {
  //   window.ymaps.ready(() => console.log('1'));
  // }

  useEffect(() => {
    if (window.ymaps) {
      window.ymaps.ready(init)
    }
  }, [])

  // window.ymaps.ready(init);
  function init() {
    // Создание карты.
    const myMap = new window.ymaps.Map("map", mapData);

    var polyline = new window.ymaps.Polyline(routData.path, {}, polyOptions);
    // Добавляем линию на карту.
    myMap.geoObjects.add(polyline);
    // Устанавливаем карте границы линии.
    myMap.setBounds(polyline.geometry.getBounds());



  }

  return (
    <div id="map" className="w-full h-full shadow-md"></div>
  );
}

export default MyMapJS;
