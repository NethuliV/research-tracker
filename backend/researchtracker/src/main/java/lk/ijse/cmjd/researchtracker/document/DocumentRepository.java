package lk.ijse.cmjd.researchtracker.document;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DocumentRepository extends JpaRepository<Document, String> {

    // Spring Data JPA will auto-implement based on naming
    List<Document> findByProjectId(String projectId);

}
