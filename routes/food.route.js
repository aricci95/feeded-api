module.exports = function (io) {
    var express = require('express');
    var router = express.Router();
    var FoodController = require('../controllers/food.controller')(io)

    router.get('/', FoodController.listAction);
    router.get('/search', FoodController.searchAction);
    router.get('/:id', FoodController.viewAction);
    router.post('/', FoodController.createAction);
    router.put('/:id', FoodController.editAction);
    router.delete('/:id', FoodController.deleteAction);

    return router
}