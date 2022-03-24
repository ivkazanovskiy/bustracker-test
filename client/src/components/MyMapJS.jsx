import React, { useEffect, useLayoutEffect } from 'react';
// import { ymaps } from 'https://api-maps.yandex.ru/2.1/?apikey=c8624c78-d5b2-4c52-96ea-8ff845b17790&lang=ru_RU'

function MyMapJS({ routData }) {

  const polyGeometry = routData.path
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
    window.ymaps.ready(init)
  }, [])

  // window.ymaps.ready(init);
  function init() {
    // Создание карты.
    var myMap = new window.ymaps.Map("map", {
      // Координаты центра карты.
      // Порядок по умолчанию: «широта, долгота».
      // Чтобы не определять координаты центра карты вручную,
      // воспользуйтесь инструментом Определение координат.
      center: [55.76, 37.64],
      // Уровень масштабирования. Допустимые значения:
      // от 0 (весь мир) до 19.
      zoom: 7
    });
  }

  return (
    <div id="map" style={{ width: '600px', height: '400px' }}></div>
  );
}

export default MyMapJS;
