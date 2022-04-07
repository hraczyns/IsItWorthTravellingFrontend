import '../css/weather.css';
import WeatherItem from "./WeatherItem";

const getWeatherPerDay = (data) => {
    return data.map((dailyWeather, i) => {
        return <WeatherItem key={i} weather={dailyWeather}/>
    })
}

const Weather = ({data = []}) => {
    return <section className={"weather-container"}>
        {getWeatherPerDay(data)}
    </section>
}

export default Weather;