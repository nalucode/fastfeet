import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DelivererController from './app/controllers/DelivererController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/authMiddleare';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.get('/deliverers', DelivererController.index);
routes.get('/deliverer/:id', DelivererController.show);
routes.post('/deliverer', DelivererController.store);
routes.put('/deliverer/:id', DelivererController.update);
routes.delete('/deliverer/:id', DelivererController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
