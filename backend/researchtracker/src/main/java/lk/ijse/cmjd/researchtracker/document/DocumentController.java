package lk.ijse.cmjd.researchtracker.document;

import lk.ijse.cmjd.researchtracker.user.User;
import lk.ijse.cmjd.researchtracker.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/api/projects/{id}/documents")
    public ResponseEntity<List<Document>> getDocumentsByProject(@PathVariable String id) {
        return ResponseEntity.ok(documentService.getDocumentsByProjectId(id));
    }

    @PostMapping("/api/projects/{id}/documents")
    @PreAuthorize("hasAnyRole('MEMBER', 'PI', 'ADMIN')")
    public ResponseEntity<Document> uploadDocument(
            @PathVariable String id,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("file") MultipartFile file) throws IOException {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User uploadedBy = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Document document = documentService.uploadDocument(id, title, description, file);
        document.setUploadedBy(uploadedBy);
        return ResponseEntity.ok(document);
    }

    @DeleteMapping("/api/documents/{id}")
    @PreAuthorize("hasAnyRole('PI', 'ADMIN')")
    public ResponseEntity<Void> deleteDocument(@PathVariable String id) {
        documentService.deleteDocument(id);
        return ResponseEntity.noContent().build();
    }
}