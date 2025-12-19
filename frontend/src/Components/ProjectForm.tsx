import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

interface ProjectFormProps {
  onClose: () => void;
  project?: any; // For update, pass existing project
}

const ProjectForm = ({ onClose, project }: ProjectFormProps) => {
  const [title, setTitle] = useState(project?.title || '');
  const [summary, setSummary] = useState(project?.summary || '');
  const [status, setStatus] = useState(project?.status || 'PLANNING');
  // Add states for other fields: tags, startDate, endDate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { title, summary, status };
      if (project) {
        await axios.put(`http://localhost:8080/api/projects/${project.id}`, payload);
      } else {
        await axios.post('http://localhost:8080/api/projects', payload);
      }
      onClose();
    } catch (error) {
      console.error('Error saving project', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </Form.Group>

      <Form.Group>
        <Form.Label>Summary</Form.Label>
        <Form.Control as="textarea" rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Status</Form.Label>
        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="PLANNING">Planning</option>
          <option value="ACTIVE">Active</option>
          <option value="ON_HOLD">On Hold</option>
          <option value="COMPLETED">Completed</option>
          <option value="ARCHIVED">Archived</option>
        </Form.Select>
      </Form.Group>

      <Button type="submit">Save</Button>
      <Button variant="secondary" onClick={onClose}>Cancel</Button>
    </Form>
  );
};

export default ProjectForm;