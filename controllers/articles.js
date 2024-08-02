const Articles = require('../models/articles')
const sequelize = require('../connection')

exports.createArticle = async (request, response) => {
    const createdArticles =({
        title: request.body.title,
        content: request.body.content,
        image: request.body.image
    })
    console.log(createdArticles);
    try {
        const newArticles = await Articles.create({
            title: createdArticles.title,
            content: createdArticles.content, 
            image: createdArticles.image
        });
        response.status(201).json(newArticles);
    } catch (error) {
        console.error('Error featching articles:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllArticles = async (requset, response) => {
    try {
        const article = await Articles.findAll();
        response.status(200).send(article);
    } catch (error) {
        console.error('Error featching articles:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
};

exports.getArticleById = async (request, response) => {
    const { id } = request.params;
    try {
        const singleArticle = await Articles.findByPk(id);
        if(!singleArticle) {
            return response.status(404).json({ error: 'articles not found' });
        }
        response.status(200).json(singleArticle);
    } catch (error) {
        console.error('Error featching post:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateArticle = async (request, response) => {
    const { id } = request.params;
    const { title, content, image } = request.body;
    
    try {
        const updated = await Articles.update(
            { title, content, image }, { where: { id } }
        );
        if(updated) {
            const updatedArticle = await Articles.findByPk(id);
            response.status(200).json(updatedArticle);
        } else {
            response.status(404).json({ error: 'articles not found' });
        }
    } catch (error) {
        console.error('Error featching post:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteArticle = async (request, response) => {
    const { id } = request.params;
    try {
        const deleted = await Articles.destroy({ where: { id } });
        if(deleted) {
            response.status(204).json({ message: 'articles deleted' });
        } else {
            response.status(404).json({ error: 'articles not found' });
        }
    } catch (error) {
        console.error('Error featching articles:', error);
        response.status(500).json({ error: 'Internal server error' }); 
    }
};