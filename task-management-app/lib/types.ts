import type { User } from 'firebase/auth';

export type Task = {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  completed: boolean;
  userEmail: string | null;
  createdAt: number; // milliseconds since epoch
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};
