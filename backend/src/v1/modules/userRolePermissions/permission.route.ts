import * as express from 'express';
import acountLimiter from '../../shared/middlewares/rateLimiterForRoutes';
import { permissionValidation, validate } from './permission.validation';
import {
  createPermissionController,
  getPermissionsController,
  getPermissionController,
  updatePermissionController,
  deletePermissionController,
} from './permission.controller';

const router = express.Router();

router.post(
  '/',
  acountLimiter,
  permissionValidation(),
  validate,
  createPermissionController
);

router.get('/', getPermissionsController);
router.get('/:id', getPermissionController);
router.put(
  '/:id',
  permissionValidation(),
  validate,
  // isAuthorized(ROLES_LIST.HumanResource, ROLES_LIST.Administrator),
  updatePermissionController
);
router.delete('/:id', deletePermissionController);

export default router;
