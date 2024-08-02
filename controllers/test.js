const  theme_1  = require('../models/theme_1')
const  theme_2  = require('../models/theme_2')
const  theme_3  = require('../models/theme_3')

exports.addAnswerTheme1 = async (request, response) => {
    const { id } = request.params;
    const { question_1, question_2, question_3, question_4,
        question_5, question_6, question_7, question_8,
        question_9, question_10, question_11, question_12 } = request.body;
    
    try {
        const updated = await theme_1.update(
            { question_1, question_2, question_3, question_4,
            question_5, question_6, question_7, question_8,
            question_9, question_10, question_11, question_12 }, { where: { id } }
        );
        if(updated) {
            const updatedAnswer = await theme_1.findByPk(id);
            response.status(200).json(updatedAnswer);

        } else {
            response.status(404).json({ error: 'user not found' });
        }
    } catch (error) {
        console.error('Error featching user:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
    
}

exports.addAnswerTheme2 = async (request, response) => {
    const { id } = request.params;
    const { question_1, question_2, question_3, question_4,
        question_5, question_6, question_7, question_8,
        question_9, question_10 } = request.body;
    
    try {
        const updated = await theme_2.update(
            { question_1, question_2, question_3, question_4,
            question_5, question_6, question_7, question_8,
            question_9, question_10 }, { where: { id } }
        );
        if(updated) {
            const updatedAnswer = await theme_2.findByPk(id);
            response.status(200).json(updatedAnswer);

        } else {
            response.status(404).json({ error: 'user not found' });
        }
    } catch (error) {
        console.error('Error featching user:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
}

exports.addAnswerTheme3 = async (request, response) => {
    const { id } = request.params;
    const { question_1, question_2 } = request.body;
    
    try {
        const updated = await theme_3.update(
            { question_1, question_2 }, { where: { id } }
        );
        if(updated) {
            const updatedAnswer = await theme_3.findByPk(id);
            response.status(200).json(updatedAnswer);
        } else {
            response.status(404).json({ error: 'user not found' });
        }
    } catch (error) {
        console.error('Error featching user:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
}

exports.getAnswer1ById = async (request, response) => {
    const { id } = request.params;
    try {
        const singleAnswer = await theme_1.findByPk(id);
        if(!singleAnswer) {
            return response.status(404).json({ error: 'user not found' });
        }
        response.status(200).json(singleAnswer);
    } catch (error) {
        console.error('Error featching user:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
}

exports.getAnswer2ById = async (request, response) => {
    const { id } = request.params;
    try {
        const singleAnswer = await theme_2.findByPk(id);
        if(!singleAnswer) {
            return response.status(404).json({ error: 'user not found' });
        }
        response.status(200).json(singleAnswer);
    } catch (error) {
        console.error('Error featching user:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
}

exports.getAnswer3ById = async (request, response) => {
    const { id } = request.params;
    try {
        const singleAnswer = await theme_3.findByPk(id);
        if(!singleAnswer) {
            return response.status(404).json({ error: 'user not found' });
        }
        response.status(200).json(singleAnswer);
    } catch (error) {
        console.error('Error featching user:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
}