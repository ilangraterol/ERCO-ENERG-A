import React, { useState, useEffect } from 'react';

const StateSelector = ({ countryId, handleStateChange }) => {
    const [states, setStates] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/countries/${countryId}/states`)
            .then(response => response.json())
            .then(data => setStates(data));
    }, [countryId]);

    return (
        <select onChange={handleStateChange}>
            <option value="">Select a state</option>
            {states.map(state => (
                <option key={state.id_state} value={state.id_state}>
                    {state.name_state}
                </option>
            ))}
        </select>
    );
};

export default StateSelector;
