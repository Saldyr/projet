import { Users } from 'prisma/generated/prisma/client';

export type AuthenticatedUser = Omit<
  Users,
  'createdAt' | 'updatedAt' | 'password'
>;

export function formatAuthUser(user: Users): AuthenticatedUser {
  const { password, createdAt, updatedAt, ...userLoggedIn } = user;

  return userLoggedIn;
}
