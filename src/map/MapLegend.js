import L from 'leaflet';
import {useEffect} from "react";

const getInnerHtml = places => {
    let html = '<div class="leaflet-places-legend">';
    places.forEach(({title, coords}, i) => {
        if (coords) {
            html += "<span>" + (i + 1) + ". " + title + "</span><br/>";
        }
    })
    html += '</div>';
    return html;
}

const MapLegend = ({map, places}) => {
    useEffect(() => {
        if (map) {
            const legend = L.control({position: "bottomright"});

            legend.onAdd = () => {
                const div = L.DomUtil.create("div", "info legend");
                div.innerHTML = getInnerHtml(places);
                return div;
            };

            legend.addTo(map);
        }
    }, [map]);
    return null;
}

export default MapLegend;