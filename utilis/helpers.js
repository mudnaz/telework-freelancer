import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  if (!password) {
    throw new Error('Password is required for hashing.');
  }
  const saltRounds = 10; // Define salt rounds
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
