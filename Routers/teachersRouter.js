const express = require('express');
const teachersController = require('../Controllers/teachersController');

function routes() {
    const teachersRouter = express.Router();
    const controller = teachersController();

    teachersRouter.route('/teachers')
        .get(controller.get)
    
        teachersRouter.route('/teacher/:Id')
        .get(controller.get)

    return teachersRouter;
};

module.exports = routes;