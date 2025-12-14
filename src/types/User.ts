export type UserRole = 'ADMIN' | 'ORGANIZER' | 'CLIENT';

export interface User {
  id: number;
  nom: string;
  email: string;
  role: UserRole;
}
