const express = require('express')
const router = express.Router()
const controller = require('../controllers/test.js')

router.put('/addanswer1/:id', controller.addAnswerTheme1);
router.put('/addanswer2/:id', controller.addAnswerTheme2);
router.put('/addanswer3/:id', controller.addAnswerTheme3);

router.get('/getanswer1/:id', controller.getAnswer1ById);
router.get('/getanswer2/:id', controller.getAnswer2ById);
router.get('/getanswer3/:id', controller.getAnswer3ById);

module.exports = router