'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

type Task = { 
  id: string; 
  title: string; 
  status: 'todo'|'doing'|'done'; 
  sort: number; 
  case_id: string;
  due_at?: string;
  created_at?: string;
};

const COLUMNS: Array<{ key: Task['status']; label: string; color: string }> = [
  { key: 'todo', label: 'To Do', color: 'bg-gray-50 border-gray-200' },
  { key: 'doing', label: 'In Progress', color: 'bg-blue-50 border-blue-200' },
  { key: 'done', label: 'Completed', color: 'bg-green-50 border-green-200' }
];

interface TasksKanbanProps {
  caseId?: string; // Optional filter by case
}

export default function TasksKanban({ caseId }: TasksKanbanProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [draggedTask, setDraggedTask] = useState<string | null>(null);

  useEffect(() => {
    loadTasks();
  }, [caseId]);

  async function loadTasks() {
    setLoading(true);
    try {
      let query = sb.from('tasks').select('*');
      
      if (caseId) {
        query = query.eq('case_id', caseId);
      }
      
      const { data, error } = await query.order('sort', { ascending: true });
      
      if (error) {
        console.error('Error loading tasks:', error);
      } else {
        setTasks(data || []);
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    } finally {
      setLoading(false);
    }
  }

  async function moveTask(id: string, newStatus: Task['status']) {
    if (!id) return;

    try {
      // Calculate new sort position
      const colTasks = tasks.filter(t => t.status === newStatus);
      const newSort = (colTasks[colTasks.length - 1]?.sort || 0) + 1;

      // Optimistically update UI
      setTasks(prev => prev.map(t => 
        t.id === id ? { ...t, status: newStatus, sort: newSort } : t
      ));

      // Update database
      const { error } = await sb
        .from('tasks')
        .update({ status: newStatus, sort: newSort })
        .eq('id', id);

      if (error) {
        console.error('Error updating task:', error);
        // Revert on error
        loadTasks();
      }
    } catch (error) {
      console.error('Failed to move task:', error);
      loadTasks();
    }
  }

  function handleDragStart(e: React.DragEvent, taskId: string) {
    e.dataTransfer.setData('text/plain', taskId);
    setDraggedTask(taskId);
  }

  function handleDragEnd() {
    setDraggedTask(null);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function handleDrop(e: React.DragEvent, status: Task['status']) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      moveTask(taskId, status);
    }
    setDraggedTask(null);
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="grid md:grid-cols-3 gap-6">
          {COLUMNS.map(col => (
            <div key={col.key} className={`rounded-2xl ${col.color} min-h-[60vh] p-4 animate-pulse`}>
              <div className="h-6 bg-gray-300 rounded mb-3"></div>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-gray-300 rounded-xl"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid md:grid-cols-3 gap-6">
        {COLUMNS.map(col => (
          <div
            key={col.key}
            onDragOver={handleDragOver}
            onDrop={e => handleDrop(e, col.key)}
            className={`rounded-2xl ${col.color} border-2 border-dashed min-h-[60vh] p-4 transition-colors ${
              draggedTask ? 'border-[#C9A24A] bg-[#C9A24A]/5' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg text-[#0B1B2B] capitalize">
                {col.label}
              </h2>
              <div className="text-sm text-[#6B7280] bg-white px-2 py-1 rounded-full">
                {tasks.filter(t => t.status === col.key).length}
              </div>
            </div>
            
            <div className="space-y-3">
              {tasks
                .filter(t => t.status === col.key)
                .map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={e => handleDragStart(e, task.id)}
                    onDragEnd={handleDragEnd}
                    className={`rounded-xl p-4 bg-white border border-[#E5E7EB] hover:shadow-md transition-all cursor-move ${
                      draggedTask === task.id ? 'opacity-50 scale-95' : ''
                    } ${
                      task.status === 'done' ? 'opacity-75' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`font-medium text-[#0B1B2B] leading-snug ${
                        task.status === 'done' ? 'line-through text-[#6B7280]' : ''
                      }`}>
                        {task.title}
                      </h3>
                      <div className="flex-shrink-0 ml-2">
                        <div className={`w-2 h-2 rounded-full ${
                          task.status === 'todo' ? 'bg-gray-400' :
                          task.status === 'doing' ? 'bg-blue-400' :
                          'bg-green-400'
                        }`}></div>
                      </div>
                    </div>
                    
                    {task.due_at && (
                      <div className="text-xs text-[#6B7280] flex items-center gap-1">
                        <span>📅</span>
                        <span>Due: {new Date(task.due_at).toLocaleDateString()}</span>
                      </div>
                    )}
                    
                    <div className="mt-2 text-xs text-[#9CA3AF]">
                      ID: {task.id.slice(0, 8)}...
                    </div>
                  </div>
                ))}
              
              {tasks.filter(t => t.status === col.key).length === 0 && (
                <div className="text-center py-8 text-[#6B7280]">
                  <div className="text-2xl mb-2">
                    {col.key === 'todo' ? '📋' : col.key === 'doing' ? '⚡' : '✅'}
                  </div>
                  <p className="text-sm">
                    {col.key === 'todo' ? 'No pending tasks' :
                     col.key === 'doing' ? 'No active tasks' :
                     'No completed tasks'}
                  </p>
                  <p className="text-xs mt-1 opacity-75">
                    Drag tasks here to update status
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {tasks.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-[#0B1B2B] mb-2">No Tasks Found</h3>
          <p className="text-[#6B7280]">
            {caseId ? 'This case has no tasks yet.' : 'No tasks have been created yet.'}
          </p>
        </div>
      )}
    </div>
  );
}