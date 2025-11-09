'use client';

import { useState, useEffect } from 'react';
import { Task } from '@/lib/types';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'userEmail' | 'createdAt'>) => void;
  editingTask?: Task | null;
  onCancelEdit?: () => void;
  loading?: boolean;
}

export default function TaskForm({
  onSubmit,
  editingTask,
  onCancelEdit,
  loading = false,
}: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
    } else {
      setTitle('');
      setDescription('');
      setPriority('Medium');
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    onSubmit({
      title,
      description,
      priority,
      completed: editingTask?.completed || false,
    });

    setTitle('');
    setDescription('');
    setPriority('Medium');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">
        {editingTask ? 'Edit Task' : 'Create New Task'}
      </h2>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter task title"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task description"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
        />
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-2">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as any)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          {loading ? 'Saving...' : editingTask ? 'Update Task' : 'Create Task'}
        </button>

        {editingTask && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="px-6 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 rounded-lg transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}