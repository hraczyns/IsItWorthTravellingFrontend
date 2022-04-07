import MapFunction from "./MapFunction";

const MapFoundPlaces = ({initCoords, places}) => {
    return <main className={"leaflet-container-found-places"}>
        <MapFunction initCoords={initCoords} places={places}/>
    </main>
}

export default MapFoundPlaces;