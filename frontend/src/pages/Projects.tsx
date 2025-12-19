import React, { useState, useEffect, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import ProjectForm from '../Components/ProjectForm';

interface Project {
  id: string;
  title: string;
  summary: string;
  status: string;
  
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { role } = useContext(AuthContext)!;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects', error);
    }
  };

  const handleCreate = () => {
    setSelectedProject(null);
    setShowForm(true);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedProject(null);
    fetchProjects();
  };

  return (
    <div>
      <h2>Projects</h2>
      {(role === 'PI' || role === 'ADMIN') && <Button onClick={handleCreate}>Create Project</Button>}
      {showForm && <ProjectForm onClose={handleFormClose} project={selectedProject || undefined} />}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Summary</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.title}</td>
              <td>{project.summary}</td>
              <td>{project.status}</td>
              <td>
                <Link to={`/projects/${project.id}`}>Details</Link>
                {(role === 'PI' || role === 'ADMIN') && (
                  <>
                    {' '}
                    <Button size="sm" variant="outline-primary" onClick={() => handleEdit(project)}>Edit</Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Projects;