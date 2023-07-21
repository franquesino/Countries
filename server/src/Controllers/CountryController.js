const axios = require('axios');
const { Country, Activity } = require('../db');


const getInfoId = async(id) => {
    try{
        let getCountryById = await axios.get('http://localhost:5000/countries');
        getCountryById = getCountryById.data;
        getCountryById = {
            id: getCountryById.id,
         
            name: getCountryById.name,
    
            activities: getCountryById.activities.map(el => el.name),

            // id: getCountryById.id,
            // image: getCountryById.background_image?getCountryById.background_image:'https://besthqwallpapers.com/Uploads/8-3-2020/124076/thumb2-404-wallpaper-not-found-violet-sign-4k-violet-brickwall-404-wallpaper-not-found-violet-blank-display.jpg',
            // name: getCountryById.name,
            // description: getCountryById.description_raw,
            // activities: getCountryById.activities.map(el => el.name),
            // released: getCountryById.released,
            // rating: getCountryById.rating,
            // platforms: getCountryById.platforms.map(el => el.platform.name),
            // website: getCountryById.website
        }
        return getCountryById;
    }
    catch(e){
        return 'Not found.';
    }
};


module.exports = getInfoId;