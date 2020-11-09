const db = require('../db');

customersController = () => {
    get = async (req, res) => {
        try {
            const records = await db.get(req, res, 'customer');

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

    post = async (req, res) => {
        try {
            return await db.modify(req, res, 'AddActor', 'FirstName', 'LastName');
        }
        catch (err) {
            console.log(err);
            res.status(500);
            return res.send('Unable to create.');
        }
    };

    put = async (req, res) => {
        try {
            return await db.modify(req, res, 'UpdateActorName', 'FirstName', 'LastName');
        }
        catch (err) {
            console.log(err);
            res.status(500);
            return res.send('Unable to update.');
        }
    };

    remove = async (req, res) => {
        try {
            return await db.modify(req, res, 'DeleteActor');
        }
        catch (err) {
            console.log(err);
            res.status(500);
            return res.send('Unable to delete.');
        }
    };

    return { get, post, put, remove };
}

module.exports = customersController;