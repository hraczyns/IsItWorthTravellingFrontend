import React, { Component } from "react";
import './css/result-container.css';
import './css/global.css';
import './css/button.css'
import LinkButton from "./LinkButton";

class SubmitResults extends Component{
    constructor(props){
        super(props);
        this.state = {
            results: {
                placeName: '',
                simpleWebResult:{
                    url:'',
                    shortDescription:''
                },
                simplePlacesList: [{
                    name:'',
                    kinds:''
                }],
                simpleWeather:{
                    description:'',
                    iconUrl:'',
                    temperature:'',
                    weatherOverlook:''
                }

            },
            latlng : props.location.state
        }

        this.getWithPrecise = this.getWithPrecise.bind(this);
    }

    componentDidMount(){
        const {latlng} = this.state;
        if(latlng){
           fetch(`http://localhost:8080/api/info?lon=${this.getWithPrecise(latlng.lng)}&lat=${this.getWithPrecise(latlng.lat)}`)
                .then((response) => response.json())
                .then((data)=>{
                    this.setState({results : data})
                }); 
        }
    }

    getWithPrecise(number){
        return Number.parseFloat(number).toPrecision(4);
    }

    render(){
        const results = this.state.results;
        if(!results.simpleWebResult){
            return <div className="bad-request">
                    <LinkButton className="back-button" to = "/">Go back</LinkButton>
                    No information :( you've probably chosen an invalid place 
                </div>
        }

        return <div className="result-wrapper">
                    <LinkButton className="back-button" to = "/">Go back</LinkButton>
                    <div className ="result-container">
                        <div className ="intro">Should I really go there?</div>
                        <div className = "common-container main">
                            <div className="main__name"> 
                                {results.placeName} 
                            </div>
                            <div className = "main__photo" style={{
                                    backgroundImage: `url(${results.simpleWebResult.url })`,
                                    height : results.simpleWebResult.url ? '300px' : '15px' 
                                }}/>
                            <div className = "main__description">
                                {results.simpleWebResult.shortDescription ? results.simpleWebResult.shortDescription : 'Cannot find any reliable infromations.'}
                            </div>
                        </div>
                        <div className ="common-container weather">
                            <ul className="weather__properties">
                                <li className ="weather__property weather__overlook">{results.simpleWeather.weatherOverlook}</li>
                                <li className ="weather__property weather__icon">
                                    <div className = "weather__icon" style = {{
                                            backgroundImage : `url(${results.simpleWeather.iconUrl})`
                                        }} />
                                </li>
                                <li className ="weather__property weather__temp">Temperature : <b>{results.simpleWeather.temperature}</b>  °C </li>
                                <li className ="weather__property weather__desc">{results.simpleWeather.description}</li>
                            </ul>
                        </div>
                        <div className="common-container places">
                            <div className="places__header">Popular places in {results.placeName}: </div> 
                            <ul className="places__list">
                                {results.simplePlacesList.map(place=>{
                                return <li key={place.name} className ="places__list-element">- {place.name} , kinds: {place.kinds}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
    }
}

export default SubmitResults;