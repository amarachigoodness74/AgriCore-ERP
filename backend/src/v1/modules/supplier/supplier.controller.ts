import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import logger from '../../shared/utils/logger';
import { CustomException } from '../../shared/utils/errors';
import { ISupplier } from '../../shared/interfaces/users';
import { isSupplier } from './supplier.service';

const prisma = new PrismaClient();

export const createSupplierController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const existingUser = await isSupplier(email, next);
  if (existingUser) {
    return next(new (CustomException as any)(400, 'Supplier already exist'));
  }

  try {
    const user = await prisma.supplier.create({
      data: {
        ...req.body,
        createdBy: '67c6f549f9adaa1da52c49ab',
        updatedBy: '67c6f549f9adaa1da52c49ab',
      },
    });

    res.status(201).json({
      status: 'success',
      payload: user,
      message: 'Supplier created successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const getSuppliersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers: ISupplier[] = await prisma.supplier.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
    });
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

export const getSupplierController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await prisma.supplier.findUnique({
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

export const countSuppliersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const numOfUsers = await prisma.supplier.count();
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

export const updateSupplierController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await prisma.supplier.update({
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
      message: 'Supplier updated successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const removeSupplierController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await prisma.supplier.update({
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
      message: 'Supplier deleted successfully 🚀',
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
    await prisma.supplier.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'Supplier deleted successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};
