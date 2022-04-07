import L from 'leaflet';
import {Marker, Polygon} from 'react-leaflet';
import '../css/leaflet-container.css';

const PolygonWithText = ({coords, text}) => {
    if(!coords){
        return null;
    }
    const center = L.polygon([coords, coords]).getBounds().getCenter();
    const iconText = L.divIcon({
        html: text,
        iconSize: null,
        className: "leaflet-div-icon-for-place"
    });

    return (
        <Polygon color="black" positions={[coords, coords]}>
            <Marker position={center} icon={iconText} />
        </Polygon>
    );
}

export default PolygonWithText