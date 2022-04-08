import React, {useEffect, useState} from "react";
import '../css/results.css';
import '../css/global.css';
import '../css/loading.css'
import AnimatedBg from "../animation/AnimatedBg";
import ReactLoading from "react-loading";
import Places from "../places/Places";
import MapFoundPlaces from "../map/MapFoundPlaces";
import Weather from "../weather/Weather";
import UserHistory from "../UserHistory";
import Costs from "../cost/Costs";
import CategoriesFilter, {DEFAULT_KINDS} from "../category/CategoriesFilter";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import isItWorthTravellingService from "../service/IsItWorthTravellingService";

const getInitCoords = (places) => {
    if (places && places.length > 0) {
        const coords = places[0]?.coords;
        return coords.split(";");
    }
}

const getPlacesCoords = (places) => {
    if (places) {
        return places.map(p => {
                return {
                    ...p,
                    ...(p.coords && {coords: p.coords.split(';')})
                }
            }
        )
    }
    return [];
}

const SubmitResults = (history) => {
    const latLng = history.location.state;
    const [data, setData] = useState(null);
    const [places, setPlaces] = useState([]);
    const [costItems, setCostItems] = useState([]);

    const [loadingMain, setLoadingMain] = useState(true);
    const [loadingPlaces, setLoadingPlaces] = useState(true);
    const [loadingCosts, setLoadingCosts] = useState(true);

    const [kinds, setKinds] = useState(DEFAULT_KINDS);

    const getTrips = async () => {
        if (latLng) {
            try {
                setLoadingPlaces(true);
                const data = await isItWorthTravellingService.getPlaces(latLng, kinds);
                setPlaces(data);
            } catch (e) {
                setPlaces([]);
            } finally {
                setLoadingPlaces(false);
            }
        }
    };

    useEffect(() => {
        (async () => {
            if (latLng) {
                try {
                    setLoadingMain(true);
                    const data = await isItWorthTravellingService.getMain(latLng);
                    setData(data);
                } catch (e) {
                    setData(null);
                } finally {
                    setLoadingMain(false);
                }
            }
        })();
        (async () => {
            if (latLng) {
                try {
                    setLoadingCosts(true);
                    const data = await isItWorthTravellingService.getCosts(latLng);
                    setCostItems(data);
                } catch (e) {
                    setCostItems([]);
                } finally {
                    setLoadingCosts(false);
                }
            }
        })();
        (async () => await getTrips())();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [latLng]);

    const getIntroContent = () => {
        if (loadingMain) {
            return <div className={"loading-wrapper"}>
                <ReactLoading className={"loadingMain"} type={"spinningBubbles"} width={180} color="#55cee9"/>
            </div>
        }
        return <section className={"result-main-description"}>
            <div className={"result-main-photo"} style={{
                backgroundImage: `url(${data?.simpleWebResult?.url})`,
                height: data?.simpleWebResult?.url ? '300px' : '15px'
            }}/>
            <h2 className={"result-main-title"}>{data?.placeName}</h2>
            <div
                className={"result-main-description-direct"}>{data?.simpleWebResult?.shortDescription || "Unfortunately we didn't found any reliable abstract about this city"}</div>
        </section>
    }

    const getPlaces = () => {
        if (loadingPlaces) {
            return <div className={"loading-wrapper"}>
                <ReactLoading className={"loadingMain"} type={"spinningBubbles"} width={180} color="#55cee9"/>
            </div>
        }
        return <section className={"result-trips-content"}><Places places={places}/></section>
    }

    const getCategories = () => {
        return <section>
            <CategoriesFilter onFilterClick={async () => await getTrips()} onChange={setKinds} kinds={kinds}/>
        </section>
    }

    const getPlacesMap = () => {
        if (loadingPlaces) {
            return <div className={"loading-wrapper"}>
                <ReactLoading className={"loadingMain"} type={"spinningBubbles"} width={180} color="#55cee9"/>
            </div>
        }
        return <MapFoundPlaces initCoords={getInitCoords(places)} places={getPlacesCoords(places)}/>
    }

    const getWeather = () => {
        if (loadingMain) {
            return <div className={"loading-wrapper"}>
                <ReactLoading className={"loadingMain"} type={"spinningBubbles"} width={180} color="#55cee9"/>
            </div>
        }
        return <Weather data={data?.simpleWeatherDailyItems}/>
    }

    const getCosts = () => {
        if (loadingCosts) {
            return <div className={"loading-wrapper"}>
                <ReactLoading className={"loadingMain"} type={"spinningBubbles"} width={180} color="#55cee9"/>
            </div>
        }
        return <Costs data={costItems}/>
    }


    return <main className={"result-wrapper"}>
        <header className={"results-main-header"}>But... should I go there &#129300; ?</header>
        <article className={"result-main"}>
            {getIntroContent()}
            <AnimatedBg/>
        </article>
        <article className={"result-costs-wrapper"}>
            <header className={"result-costs-header"}>How much it's gonna cost? 💰</header>
            {getCosts()}
        </article>
        <article className={"result-trips"}>
            <header className={"result-trips-header"}>Check out interesting places &#9875;</header>
            {getCategories()}
            {getPlaces()}
        </article>
        <article className={"result-trips-map-container"}>
            <header className={"result-trips-map-header"}>Find your interesting places on the map &#9970;</header>
            {getPlacesMap()}
        </article>
        <article className={"result-weather-container"}>
            <header className={"result-weather-header"}>What is the weather on days? &#9925;</header>
            {getWeather()}
        </article>
        <article className={"user-history-container"}>
            <header className={"user-history-header"}>User searching history &#128214;</header>
            <UserHistory onNavigateClick={() => {
                setLoadingMain(true);
                setLoadingPlaces(true);
            }} placeName={data?.placeName} latLng={latLng} timestamp={data?.timestamp}/>
        </article>
    </main>
}

export default SubmitResults;
