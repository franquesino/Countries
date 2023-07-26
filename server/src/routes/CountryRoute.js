const { Router } = require('express');
const { Country, Activity } = require('../db');
const { getDB } = require('../Controllers/CountriesController');
const getInfoId = require('../Controllers/CountryController');

const router = Router();

router.get('/:id', async(req, res) => {
    let { id } = req.params;
    
    try{
        if(id.includes('-')){
            const allId = await getDB();
            let countryid = allId.find(el => el.id === id);

            res.status(200).json(countryid);
        }
        else{
            const getGames = await getInfoId(id);

            res.status(200).json(getGames);
        }
    }
    catch(e){
        res.status(404).send('Country not found.');
    };
});

router.get('/', async(req, res) => {
    try{
        const allCountries = await Country.findAll();
        res.status(200).json(allCountries);
    }
    catch(e){
        res.status(404).send('Ups! Sorry, there was an error getting the countries :(');
    };
});

router.post('/', async(req, res) => {
    let { name} = req.body;
    //let { name, flags, continents, capital, subregion, activities, area, population } = req.body;

    try{
        let createCountry = await Country.create({
            name
            //name, flags, continents, capital, subregion, area, population
        });
        
        let activityByDb = await Promise.all(activities.map(async el=> {
            return (await Activity.findOrCreate({
                where: {
                    name: el
                }
            }))[0].dataValues.id;
        }));

        await createCountry.addActivity(activityByDb);

        let countryCreated = (await Country.findOne({
            attributes: ['name','id'],
            //attributes: [ 'name', 'flags', 'id', 'continents', 'capital', 'subregion', 'area', 'population' ],
            where: {
                name: name,
            },
            include: {
                model: Activity,
                attributes: [ 'name' ],
                through: {
                    attributes: []
                }
            }
        })).toJSON();
        countryCreated = {
            name: countryCreated.name,
          
            id: countryCreated.id,

            // name: countryCreated.name,
            // flags: countryCreated.flags,
            // id: countryCreated.id,
            // continents: countryCreated.continents,
            // capital: countryCreated.capital,
            // subregion: countryCreated.subregion,
            // area: countryCreated.area,
            // activities: countryCreated.Activities.map(el => el.name),
            // population: countryCreated.population
        };
        res.status(200).json(countryCreated);
    }
    catch(e){
        res.status(404).send('Ups! Sorry, there was an error creating the country :(');
    };
});


module.exports = router;