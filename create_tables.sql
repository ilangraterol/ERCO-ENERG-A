-- Crear la tabla countries
CREATE TABLE countries (
    id_country INT,
    name_country TEXT    
);

-- Cargar los datos
COPY countries FROM 'C:/proyectos/c_node/files/countries.csv' DELIMITER ',' CSV HEADER;

-- Crear la tabla states
CREATE TABLE states (
    id_state INT,
    name_state TEXT,
    id_country INT   
);

-- Cargar los datos 
COPY states FROM 'C:/proyectos/c_node/files/states.csv' DELIMITER ',' CSV HEADER;

-- Crear la tabla cities
CREATE TABLE cities (
    id_city INT,
    name_city TEXT,
    id_state INT,
    population INT    
);

-- Cargar los datos
COPY cities FROM 'C:/proyectos/c_node/files/cities.csv' DELIMITER ',' CSV HEADER;

--Crear la vista cities_states_countries
CREATE VIEW cities_states_countries AS
SELECT c.id_city, c.name_city, s.id_state, s.name_state, co.id_country, co.name_country, c.population
FROM cities c
JOIN states s ON s.id_state = c.id_state
JOIN countries co ON co.id_country = s.id_country;