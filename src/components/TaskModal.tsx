import React, { useState } from 'react';
import Modal from 'react-modal';
import { Task } from '../types'; // No need to import Priority if it's not defined in types
import './TaskModal.css';

interface TaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onSubmit: (task: Task) => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onRequestClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'TODO' | 'IN_PROGRESS' | 'COMPLETED'>('TODO');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Low');
  const [date, setDate] = useState('');

  const handleSubmit = () => {
    if (title.trim() === '') {
      alert('Title is required');
      return;
    }
    const newTask: Task = {
      id: Date.now(), // Ensure the id is a number
      title,
      description,
      status,
      priority,
      date,
    };
    onSubmit(newTask);
    setTitle('');
    setDescription('');
    setStatus('TODO');
    setPriority('Low');
    setDate('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
      contentLabel="Create Task"
    >
      <div className="modal-header">
        <h2 className="create-task-header">
          <span className="plus-icon">+</span>
          Create Task
        </h2>
        <button className="close-button" onClick={onRequestClose}>&times;</button>
      </div>
      <div className="modal-content">
        <div className="form-group">
          <label htmlFor="title">Title <span className="required-asterisk">*</span></label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="modal-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Enter task description"
            className="modal-textarea"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Select Date <span className="required-asterisk">*</span></label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="modal-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={e => setStatus(e.target.value as 'TODO' | 'IN_PROGRESS' | 'COMPLETED')}
            className="modal-select"
          >
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={e => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
            className="modal-select"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="modal-footer">
          <button className="modal-button cancel" onClick={onRequestClose}>Cancel</button>
          <button className="modal-button add-task" onClick={handleSubmit}>Create</button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;
