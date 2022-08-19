import axios from 'axios'
import {useState, useEffect} from 'react'
import './App.css';


const ShowCountries = ({CountriesShow, setfilterState, weather}) => {

    const countrylist = CountriesShow.map(maa => <p key={maa.name.official.length+Math.random(4525)}>{maa.name.official} <button onClick={() => {setfilterState([maa])}}> Select </button> </p>)
    if (countrylist.length <= 10 && countrylist.length > 1){
      return countrylist

    } else if (countrylist.length === 1) {
      const languagelist = Object.keys(CountriesShow[0].languages).map(maa => <p key={maa}>{CountriesShow[0].languages[maa]}</p>)
      return <div>
        <h1>{CountriesShow[0].name.official}</h1>
        <p>Capital: {CountriesShow[0].capital}</p>
        <p>Area: {CountriesShow[0].area}</p>
        <h2>languages</h2>
        {languagelist} 
        <div>
        <img className="flag" src={CountriesShow[0].flags.png} alt={"Country Flag"}/>
        <h2>Weather</h2>
        <p>Temperature {weather.current.temp_c} celsius</p>
        <img className="weather" src={weather.current.condition.icon} alt={"weather icon"}/>
        <p>Wind {Math.round((((weather.current.wind_kph*1000)/60)/60))} m/s</p>
        </div>
      </div>
 }
}

function App() {
  const [maat, setMaat] = useState([])
  const [weather, setWeather] = useState('')
  const [CountriesShow, setCountriesShow] = useState([])

  const datahook = () => {
    axios.get('https://restcountries.com/v3.1/all').then(response =>{
    setMaat(response.data)
  })
}
  const weatherhook = () =>{
    if (CountriesShow.length===1){
    let maa = CountriesShow[0].name.common
    axios.get(`http://api.weatherapi.com/v1/current.json?key=d5066b27549b41dfab084525221107&q=${maa}&aqi=no`).then(response => {
      setWeather(response.data)})
    } 
  }

  useEffect(weatherhook, [CountriesShow])
  useEffect(datahook, [])

  
  const onInputChange = (event) => {
    setCountriesShow(maat.filter(maa => maa.name.official.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  return (
    <div>
      Find Countries <input onChange={onInputChange} />
      <p></p>
      <ShowCountries CountriesShow={CountriesShow} setfilterState={setCountriesShow} weather = {weather} />
    </div>
  );
}

export default App;
