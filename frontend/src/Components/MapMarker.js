import React from 'react';

const MapMarker = (({ name, key }) => {
  return (
    <div key={key}>
      <span className="brand-red">{name}</span>
    </div>
  );
});

export default MapMarker;