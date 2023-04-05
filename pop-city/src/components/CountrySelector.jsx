import React, { useState, useEffect } from 'react';

function CountrySelector() {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState(null);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/countries')
            .then(response => response.json())
            .then(data => setCountries(data))
            .catch(error => console.log(error));
    }, []);

    
    const handleCountryChange = (event) => {
        const countryId = parseInt(event.target.value);
        setSelectedCountry(countryId);
        setSelectedState(null);
        setSelectedCity(null);
        fetch(`http://localhost:8000/countries/${countryId}/states`)
            .then(response => response.json())
            .then(data => setStates(data))
            .catch(error => console.log(error));
    }

    const handleStateChange = (event) => {
        const stateId = parseInt(event.target.value);
        setSelectedState(stateId);
        setSelectedCity(null);
        fetch(`http://localhost:8000/states/${stateId}/cities`)        
            .then(response => response.json())
            .then(data => setCities(data))
            .catch(error => console.log(error));
        }
        console.log(cities);

    const handleCityChange = (event) => {
        const cityId = parseInt(event.target.value);
        setSelectedCity(cityId);
    }

    return (
        <div>
            <select value={selectedCountry} onChange={handleCountryChange}>
                <option value={null}>Select a country</option>
                {countries.map(country => (
                    <option key={country.id_country} value={country.id_country}>
                        {country.name_country}
                    </option>
                ))}
            </select>
            {selectedCountry && (
                <select value={selectedState} onChange={handleStateChange}>
                    <option value={""}>Select a state</option>
                    {states.map(state => (
                        <option key={state.id_state} value={state.id_state}>
                            {state.name_state}
                        </option>
                    ))}
                </select>
            )}
            {selectedState && (
                <select value={selectedCity} onChange={handleCityChange}>
                    <option value={null}>Select a city</option>
                    {cities.map(city => (
                        <option key={city.id_city} value={city.id_city}>
                            {city.name_city} ({city.population})
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}

export default CountrySelector;
