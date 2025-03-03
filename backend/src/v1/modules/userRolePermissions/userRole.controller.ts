import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import logger from '../../shared/utils/logger';
import { CustomException } from '../../shared/utils/errors';

const prisma = new PrismaClient();

export const createUserRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { role, label, description, permissions } = req.body;
  try {
    const userRole = await prisma.userRole.findUnique({ where: { label } });
    if (userRole) {
      return next(new (CustomException as any)(400, 'UserRole already exist'));
    }

    await prisma.userRole.create({
      data: {
        role,
        label,
        description,
        permissions,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Role created successfully',
    });
  } catch (error) {
    logger.error('Error in createUserRoleController', error);
    return next(
      new (CustomException as any)(
        500,
        'Create UserRole failed. Please try again later.'
      )
    );
  }
};

export const getUserRolesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUserRoles = await prisma.userRole.findMany();

    // Fetch permissions for each role
    const userRolesWithPermissions = await Promise.all(
      allUserRoles.map(async role => {
        const permissions = await prisma.permission.findMany({
          where: { id: { in: role.permissions } },
        });
        return { ...role, permissions }; // Replace IDs with actual permissions
      })
    );
    res.status(200).json({
      status: 'success',
      payload: userRolesWithPermissions,
      message: 'Operation successful',
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const getUserRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userRole = await prisma.userRole.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: 'success',
      payload: userRole,
      message: 'Operation successful',
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const updateUserRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userRole = await prisma.userRole.update({
      where: {
        id: req.params.id,
      },
      data: {
        ...req.body,
      },
    });
    res.status(200).json({
      status: 'success',
      payload: userRole,
      message: 'UserRole updated successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const deleteUserRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await prisma.userRole.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      status: 'success',
      message: 'UserRole deleted successfully 🚀',
    });
    return;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};
