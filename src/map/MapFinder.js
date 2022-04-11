import '../css/leaflet-container.css';
import MapFunction from "./MapFunction";

const MapFinder = () => {
    return <main className={"leaflet-container-wrapper"}>
        <MapFunction isFinder={true}/>
    </main>
}

export default MapFinder;