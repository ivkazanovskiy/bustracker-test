import React from 'react';
import {YMaps, Map, Polyline} from 'react-yandex-maps'

function MyMap({ routData }) {

  const polyGeometry = routData.path
  const polyOptions = {
    strokeColor: '#1a56db',
    strokeWidth: 4,
  }

  const mapData = {
    bounds: routData.bounds
  };

  return (
    <YMaps>
      <Map defaultState={mapData} className={"w-full h-full shadow-md"}>
        <Polyline geometry={polyGeometry} options={polyOptions} />
      </Map>
    </YMaps>
  );
}

export default MyMap;
