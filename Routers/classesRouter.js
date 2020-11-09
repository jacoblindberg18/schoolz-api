const express = require('express');
const classesController = require('../Controllers/classesController');

function routes() {
    const classesRouter = express.Router();
    const controller = classesController();

    classesRouter.route('/classes')
        .get(controller.get)
    
        classesRouter.route('/classes/:Id')
        .get(controller.get)

    return classesRouter;
};

module.exports = routes;