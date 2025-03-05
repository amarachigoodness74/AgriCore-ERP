import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const userRoleValidation = () => [
  body('role')
    .trim()
    .notEmpty()
    .withMessage('Role is required')
    .isString()
    .withMessage('Role must be a string'),

  body('label')
    .trim()
    .notEmpty()
    .withMessage('Label is required')
    .isString()
    .withMessage('Label must be a string'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  body('permissions')
    .isArray()
    .withMessage('Permissions must be an array of strings')
    .custom(permissions => {
      if (!permissions.every(perm => typeof perm === 'string')) {
        throw new Error('All permissions must be strings');
      }
      return true;
    }),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors: any = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  res.status(422).json({
    status: 'error',
    error: `Invalid value for ${errors.array()[0].path}`,
  });
  return;
};
