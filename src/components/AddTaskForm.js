import React, { useState } from 'react';
import { Form, InputGroup, Button, Dropdown } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

function AddTaskForm({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text, priority);
      setText('');
      setPriority('medium');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="task-input"
        />
        <Dropdown onSelect={(e) => setPriority(e)}>
          <Dropdown.Toggle variant={getPriorityVariant(priority)}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="low">Low</Dropdown.Item>
            <Dropdown.Item eventKey="medium">Medium</Dropdown.Item>
            <Dropdown.Item eventKey="high">High</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="primary" type="submit" className="add-button">
          <FaPlus /> Add Task
        </Button>
      </InputGroup>
    </Form>
  );
}

const getPriorityVariant = (priority) => {
  switch (priority) {
    case 'low': return 'success';
    case 'medium': return 'warning';
    case 'high': return 'danger';
    default: return 'secondary';
  }
};

export default AddTaskForm;