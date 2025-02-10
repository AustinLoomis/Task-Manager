import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Form, ProgressBar, Dropdown } from 'react-bootstrap';
import { FaTrash, FaEdit, FaCheck, FaPlus, FaFilter } from 'react-icons/fa';
import AddTaskForm from './components/AddTaskForm';
import Task from './components/Task';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text, priority) => {
    const newTask = {
      id: Date.now(),
      text,
      priority,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const editTask = (id, newText, newPriority) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText, priority: newPriority } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="task-manager-container">
      <div className="header">
        <h1>Task Manager</h1>
        <p>Stay organized and boost your productivity</p>
      </div>

      <div className="controls-container">
  <div className="progress-container">
    <div className="d-flex justify-content-between align-items-center mb-2">
      <span className="progress-label">Task Progress</span>
      <span className="progress-percentage">{progress}%</span>
    </div>
    <ProgressBar now={progress} className="custom-progress-bar" />
  </div>

  <div className="controls-right">
    <Dropdown>
      <Dropdown.Toggle variant="outline-secondary" id="dropdown-filter">
        <FaFilter /> {filter === 'all' ? 'All Tasks' : filter === 'completed' ? 'Completed' : 'Active'}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setFilter('all')}>All Tasks</Dropdown.Item>
        <Dropdown.Item onClick={() => setFilter('active')}>Active</Dropdown.Item>
        <Dropdown.Item onClick={() => setFilter('completed')}>Completed</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>
</div>

      <AddTaskForm onAdd={addTask} />

      <div className="task-list">
        {filteredTasks.map(task => (
          <Task
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
            onEdit={editTask}
          />
        ))}
      </div>

      {tasks.length > 0 && (
        <div className="text-end mt-3">
          <Button variant="danger" onClick={deleteAllTasks}>
            <FaTrash /> Delete All Tasks
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;