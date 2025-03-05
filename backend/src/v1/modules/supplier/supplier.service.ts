import { PrismaClient } from '@prisma/client';
import { NextFunction } from 'express';
import logger from '../../shared/utils/logger';
import { CustomException } from '../../shared/utils/errors';

const prisma = new PrismaClient();

export const isSupplier = async (email: string, next: NextFunction) => {
  try {
    const user = await prisma.supplier.findUnique({
      where: {
        email,
      },
    });
    return user !== null;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};

export const getSupplier = async (email: string, next: NextFunction) => {
  try {
    const user = await prisma.supplier.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error: any) {
    logger.error(error.message);
    return next(new (CustomException as any)(500, 'Operation unsuccessful'));
  }
};
