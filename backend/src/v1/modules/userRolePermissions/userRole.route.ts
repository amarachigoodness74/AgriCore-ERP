import * as express from 'express';
import acountLimiter from '../../shared/middlewares/rateLimiterForRoutes';
import { userRoleValidation, validate } from './userRole.validation';
import {
  createUserRoleController,
  getUserRolesController,
  getUserRoleController,
  updateUserRoleController,
  deleteUserRoleController,
} from './userRole.controller';

const router = express.Router();

router.post(
  '/',
  acountLimiter,
  userRoleValidation(),
  validate,
  createUserRoleController
);

router.get('/', getUserRolesController);
router.get('/:id', getUserRoleController);
router.put(
  '/:id',
  userRoleValidation(),
  validate,
  // isAuthorized(ROLES_LIST.HumanResource, ROLES_LIST.Administrator),
  updateUserRoleController
);
router.delete('/:id', deleteUserRoleController);

export default router;
