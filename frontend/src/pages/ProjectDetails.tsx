import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [summary, setSummary] = useState('');
  const [status, setStatus] = useState('');

  React.useEffect(() => {
    // Fetch when id changes
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/projects/${id}`);
      setProject(response.data);
      setSummary(response.data.summary || '');
      setStatus(response.data.status || 'PLANNING');
    } catch (error) {
      console.error('Error fetching project', error);
    }
  };

  if (!project) return <div>Loading...</div>;

  const handleSave = async () => {
    try {
      const payload = { ...project, summary, status };
      await axios.put(`http://localhost:8080/api/projects/${id}`, payload);
      setEditing(false);
      fetchProject();
    } catch (error) {
      console.error('Error updating project', error);
    }
  };

  return (
    <div>
      <h2>{project.title}</h2>

      {!editing ? (
        <>
          <p>Summary: {project.summary}</p>
          <p>Status: {project.status}</p>
          <Button onClick={() => setEditing(true)}>Edit</Button>
        </>
      ) : (
        <>
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
          <Button onClick={handleSave}>Save</Button>{' '}
          <Button variant="secondary" onClick={() => setEditing(false)}>Cancel</Button>
        </>
      )}

      {/* Display other fields */}
      <div style={{ marginTop: '1rem' }}>
        <Link to={`/projects/${id}/milestones`}>Milestones</Link> | <Link to={`/projects/${id}/documents`}>Documents</Link>
      </div>
    </div>
  );
};

export default ProjectDetails;