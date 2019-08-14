import express from 'express';
const router = express.Router();

import ProductController from './controllers/ProductController';

/* Get all Products */
router.get('/findall', ProductController.index);

/* Create an Product */
router.post('/register', ProductController.store);

/* Get Product by ID*/
router.get('/find/:id', ProductController.find);

/* Update an Product */
router.put('/update/:id', ProductController.update);

/* Delete an Product */
router.delete('/delete/:id', ProductController.delete);

/* Ping Application */
router.get('/ping', (req, res) => res.json({ msg: 'pong' }));

export default router;
