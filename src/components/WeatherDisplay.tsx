import React, { useEffect } from 'react'
import Loading from './Loading'
import { Location } from './WeatherFetch'

type Props = {
  weather: Location['weather']
}

const WeatherDisplay: React.FunctionComponent<Props> = ({ weather }) => {
  const weatherData = weather

  return (
    <div>
      <h1>Weather</h1>
      {weatherData.main.temp !== null ? <><p>Actual temperature: {weatherData.main.temp}° F</p>
      <p>Feels like: {weatherData.main.feels_like}° F</p>
      <p>Max temperature: {weatherData.main.temp_max}° F</p>
      <p>Min temperature: {weatherData.main.temp_min}° F</p></> : <Loading />}
    </div>
  )
}

export default WeatherDisplay
