const { Router } = require('express');
const { getCountries ,getCountriesById, getCountriesByName} = require('../Controllers/CountriesController')
const { create } = require('../Controllers/ActivitiesController')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/countries', getCountries);
router.get('/countries/:id', getCountriesById); // '/countries/?id='
// router.get('/countries/', getCountriesByName);
router.post('/activity', create)

// GET | /countries/name?= | /countries/id | /activity
// POST | /activity





module.exports = router;