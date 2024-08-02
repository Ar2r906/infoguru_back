const YAML = require('yamljs')
const swaggerUI = require('swagger-ui-express')
const express = require('express')
const app = express()
const path = require('path')
const swaggerDoc = YAML.load(path.join('./docs/query.yml'))

require('dotenv').config({ path: '.env.local' })
let cors = require('cors')
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT;

const auths_routes = require('./routes/auths');
const users_routes = require('./routes/users');
const news_routes = require('./routes/news');
const tests_routes = require('./routes/tests');
const articles_routes = require('./routes/articles');

const { error } = require('console');

app.use(
    cors({
        origin: ['http://localhost:8080']
    })
);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use('/api/auths', auths_routes);
app.use('/api/users', users_routes);
app.use('/api/news', news_routes);
app.use('/api/tests', tests_routes);
app.use('/api/articles', articles_routes);

app.use((error, requset, response, next) => {
    if(error instanceof SyntaxError)
        response.status(404).send({ message: 'неверные данные' })
    else next()
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});