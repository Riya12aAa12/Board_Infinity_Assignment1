export interface Task {
  id: number;
  title: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'Low' | 'Medium' | 'High';
  date: string;
  description: string;
}

export {}; // Add this line to make it a module
