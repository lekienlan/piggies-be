import Joi from 'joi';
import { joiPaginate } from 'middlewares/paginate/paginate.validation';

const nameSchema = Joi.string().required();
const typeSchema = Joi.string().only().allow('expense', 'income').required();

const styleSchema = Joi.object().keys({
  color: Joi.string(),
  icon: Joi.string()
});

export const basePayload = {
  body: Joi.object().keys({
    name: nameSchema,
    type: typeSchema,
    style: styleSchema
  })
};
export const createPayload = basePayload;

export const updatePayload = basePayload.body.keys({
  name: nameSchema.optional(),
  type: typeSchema.optional(),
  style: styleSchema.optional()
});

export const params = {
  query: Joi.object().keys({
    ...joiPaginate,
    type: Joi.string().only().allow('expense', 'income')
  })
};
