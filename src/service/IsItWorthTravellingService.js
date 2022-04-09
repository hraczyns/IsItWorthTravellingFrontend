import restService from "./RestService";

const getWithPrecise = (number) => {
    return Number.parseFloat(number).toPrecision(4);
}

const isItWorthTravellingService = {
    getMain : (latLng) => {
        return restService.get(`/api/info?lon=${getWithPrecise(latLng.lng)}&lat=${getWithPrecise(latLng.lat)}`);
    },
    getCosts : (latLng) => {
        return restService.get(`/api/info/costs?lon=${getWithPrecise(latLng.lng)}&lat=${getWithPrecise(latLng.lat)}`);
    },
    getPlaces : (latLng, kinds) => {
        const kindsPart = kinds && kinds.length > 0 ? '&kinds=' + kinds.filter(k => k !== "all") : "";
        return restService.get(`/api/info/places?lon=${getWithPrecise(latLng.lng)}&lat=${getWithPrecise(latLng.lat)}${kindsPart}`);
    }
}

export default isItWorthTravellingService;