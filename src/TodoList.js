import React, { useState, useEffect } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');
  const [deletingIndex, setDeletingIndex] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleRemoveTask = (index) => {
    setDeletingIndex(index);
    setTimeout(() => {
      setTasks(tasks.filter((_, i) => i !== index));
      setDeletingIndex(null);
    }, 500);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>
      <ul>
        {filteredTasks.map((task, index) => (
          <li
            key={index}
            className={`${task.completed ? 'completed' : ''} ${deletingIndex === index ? 'fade-out' : ''}`}
          >
            {task.text}
            <div>
              <button onClick={() => toggleTaskCompletion(index)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => handleRemoveTask(index)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
