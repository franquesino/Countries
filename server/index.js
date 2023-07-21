const axios = require('axios');
const server = require("./src/server");
const { conn, Country} = require('./src/db.js');
const PORT = 3001;
const express = require('express');
const app = express();



conn.sync({ force: true }).then(async () => { // Añade "async" para poder utilizar "await" dentro de la función
  await server.listen(PORT, async () => { // Añade "await" para asegurarte de que el servidor se inicie correctamente antes de continuar
    const allCountries = await Country.findAll(); // Añade "await" para esperar a que se complete la consulta a la base de datos
    if (allCountries.length === 0) { // Cambia "!allCountries.length" a "allCountries.length === 0" para verificar si no hay países
      try {
        let apiCountriesResponse;
        await axios.get('http://localhost:5000/countries').then((res) => apiCountriesResponse = res.data);

        // console.log('responsex:', apiCountriesResponse)
        

        const apiCountries = apiCountriesResponse.map((e) => {
          return {
            id: e.cca3,
            name: e.name.common,
            flags: e.flags.png,
            continents: e.continents[0],
            capital: e.capital ? e.capital[0] : 'Not found',
            subregion: e.subregion || 'Not found',
            area: e.area,
            population: e.population
          };
        });
        await Country.bulkCreate(apiCountries);
        console.log('Countries created');
      } catch (error) {
        console.error(error);
      }
    }
    console.log(`Server listening on port ${PORT}`);
  });
}).catch(error => console.error(error));
