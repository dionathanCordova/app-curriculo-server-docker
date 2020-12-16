import express from 'express';

const routes = express();

routes.get('/', (req, res) => {
    return res.json('teste 22');
})

export default routes;