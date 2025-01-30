import * as express from 'express';
import acountLimiter from '../middlewares/rateLimiterForRoutes';
import {
  loginValidation,
  forgetPasswordValidation,
  resetPasswordValidation,
  validate,
} from '../validations/auth.validation';
import {
  loginController,
  forgotPasswordController,
  resetPasswordController,
  refreshTokenController,
  logoutController,
  getSession,
} from '../controllers/auth.controller';

const router = express.Router();

router.post(
  '/login',
  acountLimiter,
  loginValidation(),
  validate,
  loginController
);

router.post(
  '/forgot-password',
  acountLimiter,
  forgetPasswordValidation(),
  validate,
  forgotPasswordController
);

router.put(
  '/reset-password',
  resetPasswordValidation(),
  validate,
  resetPasswordController
);

router.get('/refresh', acountLimiter, refreshTokenController);

router.get('/session', getSession);

router.get('/logout', logoutController);

export default router;
