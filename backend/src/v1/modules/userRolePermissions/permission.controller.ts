import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import logger from '../../shared/utils/logger';
import { CustomException } from '../../shared/utils/errors';

const prisma = new PrismaClient();

export const createPermissionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, key, description, group } = req.body;
  try {
    const permission = await prisma.permission.findUnique({ where: { key } });
    if (permission) {
      return next(
        new (CustomException as any)(400, 'Permission already exist')
      );
    }

    await prisma.permission.create({
      data: {
        name,
        key,
        description,
        group,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Permission created successfully',
    });
  } catch (error) {
    logger.error('Error in createPermissionController', error);
    return next(
      new (CustomException as any)(
        500,
        'Create Permission failed. Please try again later.'
      )
    );
  }
};

export const getPermissionsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPermissions = await prisma.permission.findMany();
    res.status(200).json({
      status: 'success',
      payload: allPermissions,
      message: 'Operation successful',
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const getPermissionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const permission = await prisma.permission.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: 'success',
      payload: permission,
      message: 'Operation successful',
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const updatePermissionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const permission = await prisma.permission.update({
      where: {
        id: req.params.id,
      },
      data: {
        ...req.body,
      },
    });
    res.status(200).json({
      status: 'success',
      payload: permission,
      message: 'Permission updated successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const deletePermissionController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await prisma.permission.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'Permission deleted successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};
