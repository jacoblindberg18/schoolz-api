const dbCart = require('../dbCart');
const db = require('../dbCart');

cartController = () => {
    get = async (req, res) => {
        try {
            const records = await dbCart.get(req, res, 'cart');

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

module.exports = cartController;