const db = require('../db');

cartProductController = () => {
    get = async (req, res) => {
        try {
            const records = await db.getCartProduct(req, res, 'cartproduct');

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

module.exports = cartProductController;