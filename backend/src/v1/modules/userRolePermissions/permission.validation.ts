import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const permissionValidation = () => [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string'),

  body('key')
    .trim()
    .notEmpty()
    .withMessage('Key is required')
    .isString()
    .withMessage('Key must be a string'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  body('group')
    .trim()
    .notEmpty()
    .withMessage('Group is required')
    .isString()
    .withMessage('Group must be a string'),
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
};
