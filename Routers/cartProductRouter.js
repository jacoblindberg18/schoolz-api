const express = require('express');
const classesController = require('../Controllers/cartProductController');

function routes() {
    const cartProductRouter = express.Router();
    const controller = cartProductController();

    cartProductRouter.route('/cartproduct')
        .get(controller.get)
    
        cartProductRouter.route('/cartproduct/:Id')
        .get(controller.get)

    return cartProductRouter;
};

module.exports = routes;