import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { omit, pick } from 'lodash';
import { PAGINATE_OPTIONS } from 'middlewares/paginate/paginate.constant';
import type { IPaginateOptions } from 'middlewares/paginate/paginate.interface';
import catchAsync from 'utils/catchAsync';

import { categoryService } from '.';
import type {
  ICategoryPayload,
  ICategoryUpdatePayload
} from './category.interface';

export const findMany = catchAsync(async (req: Request, res: Response) => {
  const filter = omit(req.query, PAGINATE_OPTIONS);
  const options: IPaginateOptions = pick<Record<string, any>>(
    req.query,
    PAGINATE_OPTIONS
  );

  const categories = await categoryService.findMany(filter, options);

  res.send(categories);
});

export const create = catchAsync(
  async (req: Request<{}, {}, ICategoryPayload>, res: Response) => {
    const { name, type, style, userId } = req.body;
    const category = await categoryService.create({
      name,
      type,
      style,
      userId
    });

    res.status(StatusCodes.CREATED).send(category);
  }
);

export const update = catchAsync(
  async (
    req: Request<{ id: string }, {}, ICategoryUpdatePayload>,
    res: Response
  ) => {
    const { name, type, style } = req.body;

    const category = await categoryService.update({
      id: req.params.id,
      name,
      type,
      style
    });

    res.send(category);
  }
);

export const remove = catchAsync(
  async (req: Request<{ id: string }>, res: Response) => {
    const category = await categoryService.remove({
      id: req.params.id
    });

    res.send(category);
  }
);
