import Joi from 'joi';

const validateImageUrl = (value, helpers) => {
  console.log(value);
  console.log(helpers);
}

export const validateSignup = user => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required().label('Name'),
    email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email({ tlds: { allow: false } })
      .label('Email'),
    password: Joi.string().min(6).max(1024).required().label('Password'),
    biz: Joi.boolean().label('Bussiness'),
  });

  return schema.validate(user, { abortEarly: false });
};

export const validateLogin = user => {
  const schema = Joi.object({
    email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email({ tlds: { allow: false } })
      .label('Email'),
    password: Joi.string().min(6).max(1024).required().label('Password'),
  });

  return schema.validate(user, { abortEarly: false });
};

export const validateCard = card => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(25).required().label('Name'),
    description: Joi.string().min(10).max(100).required().label('Description'),
    phone: Joi.string().min(9).max(10).required().label('Phone'),
    address: Joi.string().min(10).max(50).required().label('Address'),
    image: Joi.string().allow(null, '').label('Image'),
  });

  return schema.validate(card, { abortEarly: false });
};

export default {
  validateSignup,
  validateLogin,
  validateCard,
};
