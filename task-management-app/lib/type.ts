import { User } from "firebase/auth";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
  userEmail: string;
  createdAt: number;
}

export interface AuthContextType {
  user: User | null | undefined;
  loading: boolean;
  logout: () => Promise<void>;
}