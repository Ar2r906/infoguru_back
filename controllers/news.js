const News = require('../models/news')
const sequelize = require('../connection')

exports.createNews = async (request, response) => {
    const createdNews =({
        title: request.body.title,
        content: request.body.content,
        image: request.body.image
    })
    console.log(createdNews);
    try {
        const newNews = await News.create({
            title: createdNews.title,
            content: createdNews.content, 
            image: createdNews.image
        });
        response.status(201).json(newNews);
    } catch (error) {
        console.error('Error featching news:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
};

exports.getAllNews = async (request, response) => {
    try {
        const news = await News.findAll();
        response.status(200).send(news);
    } catch (error) {
        console.error('Error featching news:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
};

exports.getNewsById = async (request, response) => {
    const { id } = request.params;
    try {
        const singleNews = await News.findByPk(id);
        if(!singleNews) {
            return response.status(404).json({ error: 'news not found' });
        }
        response.status(200).json(singleNews);
    } catch (error) {
        console.error('Error featching news:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
};

exports.updateNews = async (request, response) => {
    const { id } = request.params;
    const { title, content, image } = request.body;
    
    try {
        const updated = await News.update(
            { title, content, image }, { where: { id } }
        );
        if(updated) {
            const updatedNews = await News.findByPk(id);
            response.status(200).json(updatedNews);
        } else {
            response.status(404).json({ error: 'news not found' });
        }
    } catch (error) {
        console.error('Error featching news:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteNews = async (request, response) => {
    const { id } = request.params;
    try {
        const deleted = await News.destroy({ where: { id } });
        if(deleted) {
            response.status(204).send({ message: 'news deleted' });
        } else {
            response.status(404).json({ error: 'news not found' });
        }
    } catch (error) {
        console.error('Error featching news:', error);
        response.status(500).json({ error: 'Internal server error' }); 
    }
};