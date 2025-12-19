package lk.ijse.cmjd.researchtracker.document;

import lk.ijse.cmjd.researchtracker.project.Project;
import lk.ijse.cmjd.researchtracker.project.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class DocumentService {
    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private ProjectRepository projectRepository;

    // Change this to your desired upload directory
    private final String UPLOAD_DIR = "/path/to/uploads/"; // e.g., System.getProperty("user.dir") + "/uploads/"

    public List<Document> getDocumentsByProjectId(String projectId) {
        return documentRepository.findByProjectId(projectId);
    }

    public Document getDocumentById(String id) {
        return documentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Document not found with id: " + id));
    }

    public Document uploadDocument(String projectId, String title, String description, MultipartFile file)
            throws IOException {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + projectId));

        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        String filePath = UPLOAD_DIR + fileName;
        file.transferTo(new File(filePath));

        Document document = new Document();
        document.setId(UUID.randomUUID().toString());
        document.setProject(project);
        document.setTitle(title);
        document.setDescription(description);
        document.setUrlOrPath(filePath); // Or use URL if hosted
        // Assuming uploadedBy is set by controller (current user)
        document.setUploadedAt(LocalDateTime.now());
        return documentRepository.save(document);
    }

    public void deleteDocument(String id) {
        Document document = getDocumentById(id);
        // Optionally delete the physical file
        new File(document.getUrlOrPath()).delete();
        documentRepository.deleteById(id);
    }
}