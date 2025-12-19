import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import DocumentUpload from '../Components/DocumentUpload';

interface Document {
  id: string;
  title: string;
  description: string;
  urlOrPath: string;
}

const Documents = () => {
  const { id } = useParams<{ id: string }>();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const { role } = useContext(AuthContext)!;

  useEffect(() => {
    fetchDocuments();
  }, [id]);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/projects/${id}/documents`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents', error);
    }
  };

  const handleUpload = () => {
    setShowUpload(true);
  };

  const handleUploadClose = () => {
    setShowUpload(false);
    fetchDocuments();
  };

  return (
    <div>
      <h2>Documents for Project {id}</h2>
      {(role === 'MEMBER' || role === 'PI' || role === 'ADMIN') && <Button onClick={handleUpload}>Upload Document</Button>}
      {showUpload && <DocumentUpload projectId={id!} onClose={handleUploadClose} />}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>URL/Path</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.title}</td>
              <td>{doc.description}</td>
              <td>{doc.urlOrPath}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Documents;