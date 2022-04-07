import React, {useState} from "react";
import {MapContainer, Marker, TileLayer, useMapEvent} from 'react-leaflet';
import '../css/leaflet-container.css';
import '../css/global.css';
import {useHistory} from 'react-router-dom';
import PolygonWithText from "../common/PolygonWithText";
import MapLegend from "./MapLegend";

const WARSAW_LOCALIZATION = [52.237, 21.017];

const getPlacesMarkers = (places) => {
    return places.map(({coords}, i) => {
        return <PolygonWithText key={i} text={(i + 1)} coords={coords}/>
    });
}

const MapFunction = ({initCoords, places = []}) => {
    initCoords = initCoords && initCoords.map(el => parseFloat(el));
    const [map, setMap] = useState(null);

    return (
        <MapContainer center={initCoords || WARSAW_LOCALIZATION} zoom={13} scrollWheelZoom={true} whenCreated={setMap}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {places.length > 0 ? getPlacesMarkers(places) : <LocationMarker/>}
            <MapLegend map={map} places={places}/>
        </MapContainer>
    );

}

const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    const history = useHistory();
    useMapEvent("click", (e) => {
        setPosition(e.latlng);
    });
    return position === null ? null : (
        <Marker position={position} eventHandlers={{
            click: () => {
                history.push('/results', position);
            }
        }}/>
    )
}

export default MapFunction;
