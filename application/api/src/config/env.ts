import * as env from 'env-var';

export const PORT = env.get('PORT').required().asPortNumber();

export const JWT_STUDENT_SECRET = env
  .get('JWT_STUDENT_SECRET')
  .required()
  .asString();
export const JWT_COMPANY_SECRET = env
  .get('JWT_COMPANY_SECRET')
  .required()
  .asString();
export const JWT_ADMIN_SECRET = env
  .get('JWT_ADMIN_SECRET')
  .required()
  .asString();

export const AWS_ID = env.get('AWS_ID').required().asString();
export const AWS_SECRET = env.get('AWS_SECRET').required().asString();
export const CLIENTS_BUCKET_NAME = env
  .get('CLIENTS_BUCKET_NAME')
  .required()
  .asString();

export const NODE_ENV = env.get('NODE_ENV').default('development').asString();

export const SENDINBLUE_API_KEY = env
  .get('SENDINBLUE_API_KEY')
  .required()
  .asString();
