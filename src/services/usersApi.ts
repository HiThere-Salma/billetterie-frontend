import axios from 'axios';
import type { User } from '../types/User';

const API_BASE_URL = '/api'; 

export async function fetchUsers(): Promise<User[]> {
  const res = await axios.get<User[]>(`${API_BASE_URL}/users`);
  return res.data;
}

export async function deleteUser(userId: number): Promise<void> {
  await axios.delete(`${API_BASE_URL}/users/${userId}`);
}

export async function createUser(payload: {
  nom: string;
  email: string;
  password: string;
  role: User['role'];
}): Promise<User> {
  const res = await axios.post<User>(`${API_BASE_URL}/users`, payload);
  return res.data;
}
