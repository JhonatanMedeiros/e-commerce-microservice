import express from 'express';

import AdminController from './admin-controller';

const router = express.Router();

router.get('/endpoints', AdminController.index);

router.post('/endpoints', AdminController.store);

router.get('/endpoints/:name', AdminController.find);

router.put('/endpoints/:name', AdminController.update);

router.delete('/endpoints/:name', AdminController.delete);

export default router;
