'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import TaskForm from '@/components/TaskForm';
import TaskList from '@/components/TaskList';
import { Task } from '@/lib/types';
import { LogOut } from 'lucide-react';

export default function DashboardPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  // Fetch tasks from Firestore
  useEffect(() => {
    if (!user) return;

    const fetchTasks = async () => {
      try {
        const q = query(
          collection(db, 'tasks'),
          where('userEmail', '==', user.email)
        );
        const snapshot = await getDocs(q);
        const fetchedTasks: Task[] = snapshot.docs.map((d: any) => {
          const data: any = d.data();
          const ca = data?.createdAt;
          let createdAtNum = 0;
          if (ca && typeof ca === 'object' && 'toMillis' in ca) {
            createdAtNum = (ca as { toMillis: () => number }).toMillis();
          } else if (typeof ca === 'number') {
            createdAtNum = ca;
          } else {
            createdAtNum = Date.now();
          }
          return { id: d.id, ...data, createdAt: createdAtNum } as Task;
        });
        setTasks(fetchedTasks.sort((a, b) => b.createdAt - a.createdAt));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  const handleAddTask = async (
    taskData: Omit<Task, 'id' | 'userEmail' | 'createdAt'>
  ) => {
    if (!user) return;

    try {
      const docRef = await addDoc(collection(db, 'tasks'), {
        ...taskData,
        userEmail: user.email,
        createdAt: serverTimestamp(),
      });

      setTasks([
        {
          ...taskData,
          id: docRef.id,
          userEmail: user.email,
          createdAt: Date.now(),
        },
        ...tasks,
      ]);
      setEditingTask(null);
    } catch (error) {
      console.error('Error adding task:', error);
      alert('Failed to add task');
    }
  };

  const handleUpdateTask = async (
    taskData: Omit<Task, 'id' | 'userEmail' | 'createdAt'>
  ) => {
    if (!editingTask || !user) return;

    try {
      const taskRef = doc(db, 'tasks', editingTask.id);
      await updateDoc(taskRef, taskData);

      setTasks(
        tasks.map((t) =>
          t.id === editingTask.id
            ? { ...t, ...taskData }
            : t
        )
      );
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      setTasks(tasks.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  const handleToggleComplete = async (taskId: string, completed: boolean) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      await updateDoc(taskRef, { completed });
      setTasks(
        tasks.map((t) => (t.id === taskId ? { ...t, completed } : t))
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Task Manager</h1>
            <p className="text-gray-600 text-lg mt-2">
              Hello, <span className="font-semibold text-blue-600">{user.email}</span>
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {/* Task Form */}
        <div className="mb-8">
          <TaskForm
            onSubmit={editingTask ? handleUpdateTask : handleAddTask}
            editingTask={editingTask}
            onCancelEdit={() => setEditingTask(null)}
            loading={loading}
          />
        </div>

        {/* Task Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <p className="text-gray-600 text-sm font-semibold">Total Tasks</p>
            <p className="text-3xl font-bold text-blue-600">{tasks.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <p className="text-gray-600 text-sm font-semibold">Completed</p>
            <p className="text-3xl font-bold text-green-600">
              {tasks.filter((t) => t.completed).length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <p className="text-gray-600 text-sm font-semibold">Pending</p>
            <p className="text-3xl font-bold text-orange-600">
              {tasks.filter((t) => !t.completed).length}
            </p>
          </div>
        </div>

        {/* Task List */}
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
          onEdit={setEditingTask}
          loading={loading}
        />
      </div>
    </div>
  );
}