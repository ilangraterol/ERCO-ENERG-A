const express = require('express');
const { Client } = require('pg');
const cors = require('cors');




const app = express();
const port = 8000;


app.use(cors({ origin: 'http://localhost:3000' }));

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'city_state_country_db',
    password: '12qwaszxC',
    port: 5432,
});

client.connect();

//ciudades y su población
app.get('/countries/:id/cities', (req, res) => {
    const countryId = req.params.id;
    client.query(
        'SELECT c.name_city, c.population ' +
        'FROM cities_states_countries csc ' +
        'JOIN cities c ON csc.id_city = c.id_city ' +
        'WHERE csc.id_country = $1',
        [countryId],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error getting data');
            }
            res.send(result.rows);
        }
    );
});

//población de un estado
app.get('/states/:id/cities', (req, res) => {
    const stateId = req.params.id;
    client.query(
        'SELECT c.name_city, c.population ' +
        'FROM cities_states_countries csc ' +
        'JOIN cities c ON csc.id_city = c.id_city ' +
        'WHERE csc.id_state = $1',
        [stateId],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error getting data');
            }
            res.send(result.rows);
        }
    );
});

//población de una ciudad
app.get('/cities/:id/population', (req, res) => {
    const cityId = req.params.id;
    client.query(
        'SELECT population ' +
        'FROM cities ' +
        'WHERE id_city = $1',
        [cityId],
        (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error getting data');
            }
            res.send(result.rows[0]);
        }
    );
});

//paises 
app.get('/countries', (req, res) => {
    client.query(
      'SELECT name_country FROM countries',
      (err, result) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Error getting data');
        }
        res.send(result.rows);
      }
    );
  });
  






app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
