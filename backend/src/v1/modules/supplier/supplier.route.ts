import * as express from 'express';
import acountLimiter from '../../shared/middlewares/rateLimiterForRoutes';
import { supplierValidation, validate } from './supplier.validation';
import {
  createSupplierController,
  getSuppliersController,
  getSupplierController,
  countSuppliersController,
  updateSupplierController,
  removeSupplierController,
} from './supplier.controller';
// import isAuthorized from '../../shared/middlewares/isAuthorized';
// import ROLES_LIST from '../../config/roles_list';

const router = express.Router();

router.post(
  '/',
  acountLimiter,
  supplierValidation(),
  validate,
  // isAuthorized(ROLES_LIST.HumanResource, ROLES_LIST.Administrator),
  createSupplierController
);
router.get('/', getSuppliersController);
router.get('/:id', getSupplierController);
router.get('/count', countSuppliersController);
router.put(
  '/:id',
  supplierValidation(),
  validate,
  // isAuthorized(ROLES_LIST.HumanResource, ROLES_LIST.Administrator),
  updateSupplierController
);
router.delete('/:id', removeSupplierController);
// router.delete('/:id', isAuthorized(ROLES_LIST.Administrator), removeController);

export default router;
