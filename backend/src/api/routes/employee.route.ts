import * as express from 'express';
import acountLimiter from '../middlewares/rateLimiterForRoutes';
import { validation, validate } from '../validations/employee.validation';
import {
  createEmployeeController,
  getEmployeesController,
  getEmployeeController,
  countEmployeesController,
  updateEmployeeController,
  removeEmployeeController,
} from '../controllers/employee.controller';
import isAuthorized from '../middlewares/isAuthorized';
// import ROLES_LIST from '../../config/roles_list';

const router = express.Router();

router.post(
  '/',
  acountLimiter,
  validation(),
  validate,
  // isAuthorized(ROLES_LIST.HumanResource, ROLES_LIST.Administrator),
  createEmployeeController
);
router.get('/', getEmployeesController);
router.get('/:id', getEmployeeController);
router.get('/count', countEmployeesController);
router.put(
  '/:id',
  validation(),
  validate,
  // isAuthorized(ROLES_LIST.HumanResource, ROLES_LIST.Administrator),
  updateEmployeeController
);
router.delete('/:id', removeEmployeeController);
// router.delete('/:id', isAuthorized(ROLES_LIST.Administrator), removeController);

export default router;
