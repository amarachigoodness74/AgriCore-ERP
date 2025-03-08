import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { omit } from 'lodash';
import config from 'config';
import logger from '../../shared/utils/logger';
import { isUser } from './category.service';
import { signAccessToken } from '../../shared/utils/helpers';
import { CustomException } from '../../shared/utils/errors';
import transporter from '../../shared/utils/emailSender';
import { IEmployee } from '../../shared/interfaces/users';
import { ICreateToken } from '../../shared/interfaces/token';

const prisma = new PrismaClient();

export const createEmployeeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const existingUser = await isUser(email, next);
  if (existingUser) {
    return next(new (CustomException as any)(400, 'Employee already exist'));
  }

  try {
    const user = await prisma.employee.create({
      data: {
        ...req.body,
        password: '',
        mustResetPassword: true,
        isActive: true,
        createdBy: '67c6f549f9adaa1da52c49ab',
        updatedBy: '67c6f549f9adaa1da52c49ab',
      },
    });
    const result = omit(user, ['password']);

    const createToken: ICreateToken = {
      employeeInfo: {
        email: result.email,
        role: result.role,
      },
      isRefreshToken: false,
    };
    const accessToken = await signAccessToken(createToken, next);

    const resetLink = `${config.get('environment.clientUrl') as string}/reset-password?token=${accessToken}`;
    const mailSent = await transporter.sendMail({
      to: email,
      subject: 'Imprtant Message From AgriCore Company',
      html: `<b>Hi ${result.name},</b><br/><br/><p>An account was just created for you. Please change your password through this <a href="${resetLink}">link</a> OR copy and paste in your browser ${resetLink}<br /> This link is valid for 1 hour.</p> Or copy link: ${resetLink}`,
    });

    if (!mailSent.messageId) {
      logger.error(
        `Could not send link to reset password for user - ${result.email}`
      );
    }

    res.status(201).json({
      status: 'success',
      payload: result,
      message: 'Employee created successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const getEmployeesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers: IEmployee[] = await prisma.employee.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        gender: true,
        department: true,
        role: true,
        label: true,
        isActive: true,
        createdBy: true,
        updatedBy: true,
      },
    });
    res.status(200).json({
      status: 'success',
      payload: allUsers,
      message: 'Operation successful',
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const getEmployeeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await prisma.employee.findUnique({
      where: {
        id,
      },
    });
    const result = omit(user, ['password']);
    res.status(200).json({
      status: 'success',
      payload: result,
      message: 'Operation successful',
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const countEmployeesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const numOfUsers = await prisma.employee.count();
    res.status(200).json({
      status: 'success',
      payload: numOfUsers,
      message: 'Operation successful',
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const updateEmployeeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.employee.update({
      where: {
        id: req.params.id,
      },
      data: {
        ...req.body,
        updatedBy: req.body.currentUserId,
      },
    });
    const result = omit(user, ['password']);
    res.status(200).json({
      status: 'success',
      payload: result,
      message: 'Employee updated successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const removeEmployeeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await prisma.employee.update({
      where: {
        id: req.params.id,
      },
      data: {
        password: '',
        isActive: false,
        mustResetPassword: true,
        resetToken: null,
        resetTokenExpiry: null,
        updatedBy: req.body.currentUserId,
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'Employee deleted successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const deleteAccountController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await prisma.employee.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'Employee deleted successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};
