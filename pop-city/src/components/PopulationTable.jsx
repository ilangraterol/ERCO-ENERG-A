import React from 'react';

const PopulationTable = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>City</th>
                    <th>Population</th>
                </tr>
            </thead>
            <tbody>
                {data.map(city => (
                    <tr key={city.id_city}>
                        <td>{city.name_city}</td>
                        <td>{city.population}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PopulationTable;
