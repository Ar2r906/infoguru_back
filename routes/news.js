const express = require('express');
const path = require('path');
const controller = require('../controllers/news')
const router = express.Router();

// маршруты + можно добавить верификацию токена
router.post('/news', controller.createNews);
router.get('/', controller.getAllNews);
router.get('/:id', controller.getNewsById);
router.put('/:id', controller.updateNews);
router.delete('/:id', controller.deleteNews);

module.exports = router