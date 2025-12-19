import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

interface MilestoneFormProps {
  projectId: string;
  onClose: () => void;
  milestone?: any; // For update
}

const MilestoneForm = ({ projectId, onClose, milestone }: MilestoneFormProps) => {
  const [title, setTitle] = useState(milestone?.title || '');
  // Add states for description, dueDate, isCompleted

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (milestone) {
        await axios.put(`http://localhost:8080/api/milestones/${milestone.id}`, { title /* add others */ });
      } else {
        await axios.post(`http://localhost:8080/api/projects/${projectId}/milestones`, { title /* add others */ });
      }
      onClose();
    } catch (error) {
      console.error('Error saving milestone', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </Form.Group>
      {/* Add other fields */}
      <Button type="submit">Save</Button>
      <Button variant="secondary" onClick={onClose}>Cancel</Button>
    </Form>
  );
};

export default MilestoneForm;