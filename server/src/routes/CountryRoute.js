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
    //let { name, image, description, released, rating, activities, platforms, website } = req.body;

    try{
        let createCountry = await Country.create({
            name
            //name, image, description, released, rating, platforms, website
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
            //attributes: [ 'name', 'image', 'id', 'description', 'released', 'rating', 'platforms', 'website' ],
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
            // image: countryCreated.image,
            // id: countryCreated.id,
            // description: countryCreated.description,
            // released: countryCreated.released,
            // rating: countryCreated.rating,
            // platforms: countryCreated.platforms,
            // activities: countryCreated.Activities.map(el => el.name),
            // website: countryCreated.website
        };
        res.status(200).json(countryCreated);
    }
    catch(e){
        res.status(404).send('Ups! Sorry, there was an error creating the country :(');
    };
});


module.exports = router;