import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import MilestoneForm from '../Components/MilestoneForm';

interface Milestone {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
}

const Milestones = () => {
  const { id } = useParams<{ id: string }>();
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [showForm, setShowForm] = useState(false);
  const { role } = useContext(AuthContext)!;

  useEffect(() => {
    fetchMilestones();
  }, [id]);

  const fetchMilestones = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/projects/${id}/milestones`);
      setMilestones(response.data);
    } catch (error) {
      console.error('Error fetching milestones', error);
    }
  };

  const handleCreate = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    fetchMilestones();
  };

  return (
    <div>
      <h2>Milestones for Project {id}</h2>
      {(role === 'MEMBER' || role === 'PI' || role === 'ADMIN') && <Button onClick={handleCreate}>Add Milestone</Button>}
      {showForm && <MilestoneForm projectId={id!} onClose={handleFormClose} />}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {milestones.map((milestone) => (
            <tr key={milestone.id}>
              <td>{milestone.title}</td>
              <td>{milestone.description}</td>
              <td>{milestone.dueDate}</td>
              <td>{milestone.isCompleted ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Milestones;