import { type ValidatorError, type ValidatorErrorField } from '../user/user.types';

export const validatorErrorHandler = (error: ValidatorError): string => {
  const values: ValidatorErrorField[] = Object.values(error.errors as ValidatorError);
  const message = values.map((value) => value.message);
  return message.join('. ');
};
