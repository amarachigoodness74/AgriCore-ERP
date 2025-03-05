import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import logger from '../../shared/utils/logger';
import { isClient } from './client.service';
import { CustomException } from '../../shared/utils/errors';
import { IClient } from '../../shared/interfaces/users';

const prisma = new PrismaClient();

export const createClientController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const existingUser = await isClient(email, next);
  if (existingUser) {
    return next(new (CustomException as any)(400, 'Client already exist'));
  }

  try {
    const user = await prisma.client.create({
      data: {
        ...req.body,
        createdBy: '67c6f549f9adaa1da52c49ab',
        updatedBy: '67c6f549f9adaa1da52c49ab',
      },
    });

    res.status(201).json({
      status: 'success',
      payload: user,
      message: 'Client created successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const getClientsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers: IClient[] = await prisma.client.findMany();
    res.status(200).json({
      status: 'success',
      payload: allUsers,
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const getClientController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await prisma.client.findUnique({
      where: {
        id,
      },
    });

    res.status(200).json({
      status: 'success',
      payload: user,
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const countClientsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const numOfUsers = await prisma.client.count();
    res.status(200).json({
      status: 'success',
      payload: numOfUsers,
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const updateClientController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.client.update({
      where: {
        id: req.params.id,
      },
      data: {
        ...req.body,
        updatedBy: req.body.currentUserId,
      },
    });

    res.status(200).json({
      status: 'success',
      payload: user,
      message: 'Client updated successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const removeClientController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await prisma.client.update({
      where: {
        id: req.params.id,
      },
      data: {
        isActive: false,
        updatedBy: req.body.currentUserId,
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'Client deleted successfully 🚀',
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
    await prisma.client.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'Client deleted successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};
