import '../css/weather.css';

const WeatherItem = ({weather}) => {
    return <div className={"weather-item"}>
        <div className={"weather-item-icon"} style={{backgroundImage: `url('${weather.iconUrl}')`}}/>
        <div className={"weather-item-title"}>{weather?.weatherOverlook}</div>
        <div className={"weather-item-text"}>{weather?.temperature} °C</div>
        <div className={"weather-item-text"}>{weather?.description}</div>
        <div className={"weather-item-text"}>{weather?.localDate}</div>
    </div>
}

export default WeatherItem;