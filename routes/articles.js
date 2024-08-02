const express = require('express');
const path = require('path');
const controller = require('../controllers/articles')
const router = express.Router();

// маршруты + можно добавить верификацию токена
router.post('/articles', controller.createArticle);
router.get('/', controller.getAllArticles);
router.get('/:id', controller.getArticleById);
router.put('/:id', controller.updateArticle);
router.delete('/:id', controller.deleteArticle);

module.exports = router