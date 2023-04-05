import React, { useState, useEffect } from 'react';

function CitySelector(props) {
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [cities, setCities] = useState([]);
  
  useEffect(() => {
    if (country && state) {
      fetch(`/countries/${country}/states/${state}/cities`)
        .then(res => res.json())
        .then(data => setCities(data))
        .catch(err => console.log(err));
    }
  }, [country, state]);
  
  const handleCountryChange = e => {
    setCountry(e.target.value);
    setState(null);
    setCities([]);
  };
  
  const handleStateChange = e => {
    setState(e.target.value);
    setCities([]);
  };
  
  return (
    <div>
      <h2>City Selector</h2>
      <label htmlFor="country-select">Select a country:</label>
      <select id="country-select" onChange={handleCountryChange}>
        <option value="">--Choose a country--</option>
        {props.countries.map(country => (
          <option key={country.id_country} value={country.id_country}>
            {country.name_country}
          </option>
        ))}
      </select>
      <br />
      {country && (
        <>
          <label htmlFor="state-select">Select a state:</label>
          <select id="state-select" onChange={handleStateChange}>
            <option value="">--Choose a state--</option>
            {props.states
              .filter(s => s.id_country === country)
              .map(state => (
                <option key={state.id_state} value={state.id_state}>
                  {state.name_state}
                </option>
              ))}
          </select>
        </>
      )}
      <br />
      {state && (
        <>
          <label htmlFor="city-select">Select a city:</label>
          <select id="city-select">
            <option value="">--Choose a city--</option>
            {cities.map(city => (
              <option key={city.id_city} value={city.id_city}>
                {city.name_city} ({city.population})
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}

export default CitySelector;
