import React, { useState, useEffect } from 'react';
import TaskModal from './TaskModal';
import { Task } from '../types';
import './TaskBoard.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from './pic.png';

const TaskBoard: React.FC = () => {
  // Initial tasks data
  const initialTasks: Task[] = [
    {
      id: 1,
      title: 'Initial',
      description: ' This is first initial task',
      priority: 'High',
      status: 'TODO',
      date: '2024-09-09',
    },
    {
      id: 2,
      title: 'Initial',
      description: 'This is second initial task',
      priority: 'Medium',
      status: 'IN_PROGRESS',
      date: '2024-09-09',
    },
    {
      id: 3,
      title: 'Initial',
      description: 'This is third initial task',
      priority: 'Low',
      status: 'COMPLETED',
      date: '2024-09-08',
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: number]: boolean }>({});

  // Load tasks from local storage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (task: Task) => {
    setTasks(prevTasks => [...prevTasks, task]);
    setIsModalOpen(false); // Close modal after adding task
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = (taskId: number) => {
    setDropdownOpen(prevState => ({
      ...prevState,
      [taskId]: !prevState[taskId],
    }));
  };

  const handleChangeStatus = (taskId: number, newStatus: 'TODO' | 'IN_PROGRESS' | 'COMPLETED') => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    setDropdownOpen(prevState => ({
      ...prevState,
      [taskId]: false, // Close dropdown after status change
    }));
  };

  return (
    <div className="task-board">
      {/* Header Section */}
      <header className="header">
        <div className="header-content">
          <img src={logo} alt="Logo" className="logo" /> {/* Add the logo here */}
          
        </div>
      </header>

      {/* Application Section */}
      <div className="application-section">
        <div className="app-info">
          <p>Desktop & Mobile Application</p>
        </div>
        <div className="button-group">
          <button className="create-task-button" onClick={handleOpenModal}>
            Create Task
          </button>
        </div>
      </div>

      {/* Task Columns */}
      <div className="task-columns">
        {/* TODO Column */}
        <div className="task-column todo">
          <div className="column-header1">
            <h2>TODO</h2>
          </div>
          <br />
          {tasks.filter(task => task.status === 'TODO').map(task => (
            <div key={task.id} className="task-item">
              <div className="task-priority">{task.priority}</div>
              <br />
              <div className="first">
                {task.title}
                <span
                  className="caret"
                  onClick={() => toggleDropdown(task.id)}
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                >
                  ▼
                </span>
                {dropdownOpen[task.id] && (
                  <div className="dropdown">
                    <button onClick={() => handleChangeStatus(task.id, 'TODO')}>TODO</button>
                    <button onClick={() => handleChangeStatus(task.id, 'IN_PROGRESS')}>IN PROGRESS</button>
                    <button onClick={() => handleChangeStatus(task.id, 'COMPLETED')}>COMPLETED</button>
                  </div>
                )}
              </div>
              <div className="second">{task.description}</div>
              <br />
              <hr />
              <p className="third">
                <i className="fas fa-calendar-day"></i>
                {task.date}
              </p>
            </div>
          ))}
        </div>

        {/* IN PROGRESS Column */}
        <div className="task-column in-progress">
          <div className="column-header2">
            <h2>IN PROGRESS</h2>
          </div>
          <br />
          {tasks.filter(task => task.status === 'IN_PROGRESS').map(task => (
            <div key={task.id} className="task-item">
              <div className="task-priority">{task.priority}</div>
              <br></br>
              <div className="first">
                {task.title}
                <span
                  className="caret"
                  onClick={() => toggleDropdown(task.id)}
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                >
                ▼
                </span>
                {dropdownOpen[task.id] && (
                  <div className="dropdown">
                    <button onClick={() => handleChangeStatus(task.id, 'TODO')}>TODO</button>
                    <button onClick={() => handleChangeStatus(task.id, 'IN_PROGRESS')}>IN PROGRESS</button>
                    <button onClick={() => handleChangeStatus(task.id, 'COMPLETED')}>COMPLETED</button>
                  </div>
                )}
              </div>
              <div className='second'> {task.description}</div>
              <br></br>
              <hr></hr>
             
              <p className="third">
                <i className="fas fa-calendar-day"></i>
                {task.date}
              </p>
            </div>
          ))}
        </div>

        {/* COMPLETED Column */}
        <div className="task-column completed">
          <div className="column-header3">
            <h2>COMPLETED</h2>
          </div>
          <br />
          {tasks.filter(task => task.status === 'COMPLETED').map(task => (
            <div key={task.id} className="task-item">
              <div className="task-priority">{task.priority}</div>
              <br></br>
              <div className="first">
                {task.title}
                <span
                  className="caret"
                  onClick={() => toggleDropdown(task.id)}
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                >
                  ▼
                </span>
                {dropdownOpen[task.id] && (
                  <div className="dropdown">
                    <button onClick={() => handleChangeStatus(task.id, 'TODO')}>TODO</button>
                    <button onClick={() => handleChangeStatus(task.id, 'IN_PROGRESS')}>IN PROGRESS</button>
                    <button onClick={() => handleChangeStatus(task.id, 'COMPLETED')}>COMPLETED</button>
                  </div>
                )}
              </div>
              <div className="second">{task.description}</div>
              <br />
              <hr />
              <p className="third">
                <i className="fas fa-calendar-day"></i>
                {task.date}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        onSubmit={handleAddTask}
      />
    </div>
  );
};

export default TaskBoard;
