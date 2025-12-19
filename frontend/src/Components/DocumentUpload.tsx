import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

interface DocumentUploadProps {
  projectId: string;
  onClose: () => void;
}

const DocumentUpload = ({ projectId, onClose }: DocumentUploadProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('description', description);

    try {
      await axios.post(`http://localhost:8080/api/projects/${projectId}/documents`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onClose();
    } catch (error) {
      console.error('Error uploading document', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </Form.Group>
      <Form.Group>
        <Form.Label>File</Form.Label>
        <Form.Control type="file" onChange={(e: any) => setFile(e.target.files[0])} required />
      </Form.Group>
      <Button type="submit">Upload</Button>
      <Button variant="secondary" onClick={onClose}>Cancel</Button>
    </Form>
  );
};

export default DocumentUpload;