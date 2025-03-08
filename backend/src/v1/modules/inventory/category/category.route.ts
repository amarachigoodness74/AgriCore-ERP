import * as express from 'express';
import acountLimiter from '../../shared/middlewares/rateLimiterForRoutes';
import { employeeValidation, validate } from './category.validation';
import {
  createEmployeeController,
  getEmployeesController,
  getEmployeeController,
  countEmployeesController,
  updateEmployeeController,
  removeEmployeeController,
} from './category.controller';
// import isAuthorized from '../../shared/middlewares/isAuthorized';
// import ROLES_LIST from '../../config/roles_list';

const router = express.Router();

router.post(
  '/',
  acountLimiter,
  employeeValidation(),
  validate,
  // isAuthorized(ROLES_LIST.HumanResource, ROLES_LIST.Administrator),
  createEmployeeController
);
router.get('/', getEmployeesController);
router.get('/:id', getEmployeeController);
router.get('/count', countEmployeesController);
router.put(
  '/:id',
  employeeValidation(),
  validate,
  // isAuthorized(ROLES_LIST.HumanResource, ROLES_LIST.Administrator),
  updateEmployeeController
);
router.delete('/:id', removeEmployeeController);
// router.delete('/:id', isAuthorized(ROLES_LIST.Administrator), removeController);

export default router;
