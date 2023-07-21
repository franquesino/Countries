const { getCountriesApi , getDetailCountries ,searchCountriesByName} = require('../routes/CountriesRoute.js')

const getCountries = async function (req, res, next) {

    if(req.query.name) {
        try{
            const search = await searchCountriesByName(String(req.query.name).toString())
            res.status(200).send(search)
        } catch(e) {
            next(e)
        }
    }

    if(!req.params.id && !req.query.name) {
        try{
            console.log(JSON.stringify('aqio'));
            
            const api = await getCountriesApi();
            
            res.status(200).send(api)
        } catch(e) {
            next(e)
        }
    } else {
        next()
    }
    
}

const getCountriesById = async function(req, res, next) {
    if(req.params.id && !req.query.name){
        try{
            const detail = await getDetailCountries(req.params.id);
            // const detailActivity = await 
            res.status(200).send(detail)
        } catch(e) {
            next(e)
        }
    } else {
        next()
    }
    
}

const getCountriesByName = async function(req, res, next){
    console.log(JSON.stringify('asdasd'));
    
    try{
        if(!req.params.id && req.query.name) {
            console.log(JSON.stringify('lol'));
            
            const search = await searchCountriesByName(String(req.query.name).toString())
            res.status(200).send(search)
        }
    } catch(e){
        next(e)
    }
}

module.exports = {
    getCountries,
    getCountriesById,
    getCountriesByName
}