import { compare, hash } from 'bcrypt';

export const encryptPassword = async (
  password: string,
): Promise<string> => {
  const saltOrRounds = 10;

  return hash(password, saltOrRounds);
};

export const validatePassword = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return compare(password, hashedPassword);
};
