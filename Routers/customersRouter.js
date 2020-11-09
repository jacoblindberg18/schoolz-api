const express = require('express');
const customersController = require('../Controllers/customersController');

function routes() {
    const customersRouter = express.Router();
    const controller = customersController();

    customersRouter.route('/customers')
        .get(controller.get)
        .post(controller.post);
    
        customersRouter.route('/customers/:Id')
        .get(controller.get)
        .put(controller.put)
        .delete(controller.remove);

    return customersRouter;
};

module.exports = routes;