const express = require("express");
const cartController = require("../Controllers/cartController");

function routes() {
    const cartRouter = express.Router();
    const controller = cartController();

    cartRouter.route("/cart")
    .get(controller.get);

    cartRouter.route("/cart/:Id")
    .get(controller.get);

    return cartRouter;
}

module.exports = routes;
