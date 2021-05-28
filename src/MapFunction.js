import React, {useState} from "react";
import { MapContainer, TileLayer, Marker, useMapEvent} from 'react-leaflet';
import './css/leaflet-container.css';
import './css/global.css';
import {useHistory} from 'react-router-dom';


function MapFunction() {
    
    return (
        <MapContainer center={[52.237, 21.017]} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker/>
       </MapContainer>
    );
  
}

function LocationMarker() {
  const [position,setPosition] = useState(null);
  const history = useHistory();
  useMapEvent('click', (e)=>{
    setPosition(e.latlng);
  });
  return position === null ? null : (
    <Marker position={position} eventHandlers={{ 
      click: (e) => { 
         history.push('/results',position);
       }
      }
    }>
    </Marker>
  )
}

export default MapFunction;
