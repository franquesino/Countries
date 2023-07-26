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
            // continents: getCountryById.continents_raw,
            // activities: getCountryById.activities.map(el => el.name),
            // capital: getCountryById.capital,
            // subregion: getCountryById.subregion,
            // area: getCountryById.area.map(el => el.area.name),
            // population: getCountryById.population
        }
        return getCountryById;
    }
    catch(e){
        return 'Not found.';
    }
};



// const getInfoId = (id) => {
//     return axios.get('http://localhost:5000/countries')
//         .then(response => {
//             const getCountryById = response.data;
//             return {
//                 id: getCountryById.id,
//                 name: getCountryById.name,
//                 activities: getCountryById.activities.map(el => el.name),
//             };
//         })
//         .catch(e => {
//             return 'Not found.';
//         });
// };



module.exports = getInfoId;