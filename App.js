import React from "react";

import Titles from "./components/Titles";
import Forms from "./components/Forms"

import Weather from "./components/Weather";
//de062921952fadffcc7e20b13105b7f4
const API_KEY ="de062921952fadffcc7e20b13105b7f4";

class my_app extends React.Component{
  state = {
    temperature: undefined,
    city:undefined,
    country:undefined,
    humidity:undefined,
    description:undefined,
    error:undefined,
  }
  getWeather = async (e) => {
    e.p reventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    if (city && country){
      console.log(data);
      this.setState({
        temperature:data.main.temp,
        city:data.name,
        country:data.sys.country,
        humidity:data.main.humidity,
        description:data.weather[0].description,
        error:""

    });
  }else{
    this.setState({
      temperature: undefined,
      city:undefined,
      country:undefined,
      humidity:undefined,
      description:undefined,
      error:"Please enter your city and country to search ",
    });
  }

  }
  render(){
    return(
      <div>
        <Titles />
        <Forms getWeather={this.getWeather}/>
        <Weather
         temperature={this.state.temperature}
         city={this.state.city}
         country={this.state.country}
         humidity={this.state.humidity}
         description={this.state.description}
         error={this.state.error}
         />
      </div>
    );
  }
};
export default my_app;
