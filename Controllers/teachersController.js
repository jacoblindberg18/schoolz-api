const db = require('../db');

teachersController = () => {
    get = async (req, res) => {
        try {
            const records = await db.get(req, res, 'teacher');

            if(res.statusCode == 404){
                return res.send('Could not find the resource.');
            }
            return res.json(records);
        }
        catch (err) {
            console.log(err);
            return res.status(404);
        }
    };

    return {get};
}

module.exports = teachersController;