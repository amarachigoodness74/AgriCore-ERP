import * as express from 'express';
import acountLimiter from '../../shared/middlewares/rateLimiterForRoutes';
import { clientValidation, validate } from './client.validation';
import {
  createClientController,
  getClientsController,
  getClientController,
  countClientsController,
  updateClientController,
  removeClientController,
} from './client.controller';
// import isAuthorized from '../../shared/middlewares/isAuthorized';
// import ROLES_LIST from '../../config/roles_list';

const router = express.Router();

router.post(
  '/',
  acountLimiter,
  clientValidation(),
  validate,
  // isAuthorized(ROLES_LIST.HumanResource, ROLES_LIST.Administrator),
  createClientController
);
router.get('/', getClientsController);
router.get('/:id', getClientController);
router.get('/count', countClientsController);
router.put(
  '/:id',
  clientValidation(),
  validate,
  // isAuthorized(ROLES_LIST.HumanResource, ROLES_LIST.Administrator),
  updateClientController
);
router.delete('/:id', removeClientController);
// router.delete('/:id', isAuthorized(ROLES_LIST.Administrator), removeController);

export default router;
