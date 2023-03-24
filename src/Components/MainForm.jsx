import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import CloudIcon from "@mui/icons-material/Cloud";

const MainForm = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [weather, setWeather] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const geocodingApiKey = "c65033cbdaa47e02577e0e0c714c4ada";
      const geocodingApiUrl = `
http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&appid=${geocodingApiKey}`;
      const geocodingResponse = await axios.get(geocodingApiUrl);
      console.log(geocodingResponse);
      const latitude = geocodingResponse.data[0].lat;
      const longitude = geocodingResponse.data[0].lon;

      const weatherApiKey = "d9128a3fbc92277e71fa17bd812363ef";
      const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`;
      const weatherResponse = await axios.get(weatherApiUrl);
      console.log(weatherResponse.data);
      setWeather(weatherResponse.data);
    } catch (error) {
      console.log(error);
      setWeather(null);
    }
  };

  return (
    <FormContainer>
        <h1 style={{fontSize: "2rem", fontWeight: "500", color: "white"}}>The Weather App</h1>
      {/* <AppLogo>
        <CloudIcon style={{width: "50px", height:"50px"}}  /> 
        <h1>The Weather App</h1>
      </AppLogo> */}
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Label>City</Label>
          <Input
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
        </InputContainer>
        <InputContainer>
          <Label>Country</Label>
          <Input
            type="text"
            placeholder="Enter country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
          />
        </InputContainer>
        <Button type="submit">Get Weather</Button>
      </Form>
      {weather && (
        <WeatherContainer>
          <WeatherTitle>{`${weather.name}, ${weather.sys.country}`}</WeatherTitle>
          <WeatherDescription>
            {weather.weather[0].description}
          </WeatherDescription>
          <Temperature>{`${weather.main.temp} °C`}</Temperature>
          <FeelsLike>{`Feels like ${weather.main.feels_like} °C`}</FeelsLike>
        </WeatherContainer>
      )}
    </FormContainer>
  );
};

export default MainForm;

const FormContainer = styled.div`
  background: transparent;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AppLogo = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  h1 {
    color: white;
  }
`;

const Form = styled.form`
  background: rgba(24, 101, 202, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 500px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
`;

const Label = styled.label`
  color: #7296A4;
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
  font-weight: 400;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 10px;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: #7296a4;
  font-size: 1rem;
  width: 100%;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #e91e63;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;

  &:hover {
    background: #d81b60;
  }
`;

const WeatherContainer = styled.div`
  background: rgba(24, 101, 202, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(20px);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  max-width: 500px;
  height: auto;
  width: 100%;
`;

const WeatherTitle = styled.h2`
  color: #ffffff;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const WeatherDescription = styled.p`
  color: #ffffff;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const Temperature = styled.p`
  color: #ffffff;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const FeelsLike = styled.p`
  color: #ffffff;
  font-size: 1.5rem;
`;

// Media queries to adjust styles at different screen sizes
const breakpoints = {
  xs: "400px",
  sm: "600px",
  md: "960px",
  lg: "1280px",
  xl: "1920px",
};

const mq = Object.keys(breakpoints).reduce((accumulator, label) => {
  accumulator[label] = `@media (min-width: ${breakpoints[label]})`;
  return accumulator;
}, {});
