'use client';

import { Task } from '@/lib/types';
import { CheckCircle, Circle, Trash2, Edit2 } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string, completed: boolean) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
  loading?: boolean;
}

const priorityColors = {
  Low: 'bg-green-100 text-green-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  High: 'bg-red-100 text-red-800',
};

export default function TaskList({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
  loading = false,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <p className="text-gray-500 text-lg">No tasks yet. Create one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`bg-white p-4 rounded-lg shadow-md border-l-4 ${
            task.priority === 'High'
              ? 'border-red-500'
              : task.priority === 'Medium'
              ? 'border-yellow-500'
              : 'border-green-500'
          }`}
        >
          <div className="flex items-start gap-3">
            <button
              onClick={() => onToggleComplete(task.id, !task.completed)}
              disabled={loading}
              className="mt-1 flex-shrink-0"
            >
              {task.completed ? (
                <CheckCircle className="w-6 h-6 text-green-500" />
              ) : (
                <Circle className="w-6 h-6 text-gray-300" />
              )}
            </button>

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold ${
                      task.completed
                        ? 'line-through text-gray-400'
                        : 'text-gray-800'
                    }`}
                  >
                    {task.title}
                  </h3>
                  <p
                    className={`text-sm mt-1 ${
                      task.completed
                        ? 'line-through text-gray-400'
                        : 'text-gray-600'
                    }`}
                  >
                    {task.description}
                  </p>
                </div>

                <span
                  className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    priorityColors[task.priority]
                  }`}
                >
                  {task.priority}
                </span>
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => onEdit(task)}
                  disabled={loading}
                  className="text-blue-500 hover:text-blue-700 font-semibold flex items-center gap-1"
                >
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button
                  onClick={() => {
                    if (
                      confirm('Are you sure you want to delete this task?')
                    ) {
                      onDelete(task.id);
                    }
                  }}
                  disabled={loading}
                  className="text-red-500 hover:text-red-700 font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}