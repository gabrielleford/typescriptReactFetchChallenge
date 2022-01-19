import React from "react";
import WeatherDisplay from "./WeatherDisplay";

export type Location = {
  geo: Geolocation
  latlong: number[]
  weather: {
    main: {
      temp: number | null,
      feels_like: number | null,
      temp_min: number | null,
      temp_max: number | null,
    }
  }
}

class WeatherFetch extends React.Component<{}, Location> {
  constructor(props: Location) {
    super(props)

    this.state = {
      geo: navigator.geolocation,
      latlong: [],
      weather: { main: { temp: null, feels_like: null, temp_min: null, temp_max: null}}
    }

    this.showPosition = this.showPosition.bind(this)
    this.getWeather = this.getWeather.bind(this)
  }

  componentDidMount() {
    this.showPosition()
  }

  showPosition() {
    return new Promise((resolve, reject) => {
      if(this.state.geo) {
        this.state.geo.getCurrentPosition(position => {
          resolve(this.setState({latlong: [position.coords.latitude, position.coords.longitude]}))
          this.getWeather();
        })
      } else {
        reject('No location currently available')
      } 
    })
  }

async getWeather() {
    await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.latlong[0]}&lon=${this.state.latlong[1]}&units=imperial&appid=09cc1e218f2a0de04de14fbd354a6b8e
    `)
    .then(res => res.json())
    .then(data => this.setState({weather: {main: {temp: Math.round(data.main.temp), feels_like: Math.round(data.main.feels_like), temp_min: Math.round(data.main.temp_min), temp_max: Math.round(data.main.temp_max)}}}))
  }

  render(): React.ReactNode {
      return(
        <>
          {this.state.geo && <WeatherDisplay weather={this.state.weather}/>}
        </>
      )
  }
}

export default WeatherFetch