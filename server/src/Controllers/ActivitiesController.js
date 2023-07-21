const { createActivity } = require('../routes/ActivitiesRoute')

const create = async function(req, res, next) {
    try{
        const dataBody = await createActivity(req.body)
        res.status(200).send(dataBody)
    } catch(e) {
        next(e)
    }
    
}

// const create = function(req, res, next) {
//     createActivity(req.body)
//         .then(dataBody => {
//             res.status(200).send(dataBody);
//         })
//         .catch(e => {
//             next(e);
//         });
// };





module.exports = {
    create
}