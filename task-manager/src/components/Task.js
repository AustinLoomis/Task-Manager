import React, { useState } from 'react';
import { ListGroup, Form, Button, Dropdown } from 'react-bootstrap';
import { FaTrash, FaEdit, FaCheck, FaEllipsisV } from 'react-icons/fa';

function Task({ task, onDelete, onToggleComplete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  const [editedPriority, setEditedPriority] = useState(task.priority);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(task.id, editedText, editedPriority);
    }
    setIsEditing(!isEditing);
  };

  return (
    <ListGroup.Item className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="d-flex align-items-center flex-grow-1">
        <Form.Check
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          className="me-3"
        />
        {isEditing ? (
          <div className="d-flex flex-grow-1 me-3">
            <Form.Control
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="me-2"
            />
            <Dropdown onSelect={(e) => setEditedPriority(e)}>
              <Dropdown.Toggle variant={getPriorityVariant(editedPriority)} size="sm">
                {editedPriority.charAt(0).toUpperCase() + editedPriority.slice(1)}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="low">Low</Dropdown.Item>
                <Dropdown.Item eventKey="medium">Medium</Dropdown.Item>
                <Dropdown.Item eventKey="high">High</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <div className="d-flex flex-grow-1 align-items-center">
            <span className="task-text">{task.text}</span>
            <span className={`priority-badge ${task.priority}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          </div>
        )}
      </div>
      <div className="task-actions">
        {isEditing ? (
          <Button variant="success" size="sm" onClick={handleEdit} className="me-2">
            <FaCheck />
          </Button>
        ) : (
          <Button variant="outline-secondary" size="sm" onClick={handleEdit} className="me-2">
            <FaEdit />
          </Button>
        )}
        <Button variant="outline-danger" size="sm" onClick={() => onDelete(task.id)}>
          <FaTrash />
        </Button>
      </div>
    </ListGroup.Item>
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

export default Task;