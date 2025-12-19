package lk.ijse.cmjd.researchtracker.milestone;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MilestoneRepository extends JpaRepository<Milestone, String> {

    // Spring Data JPA will auto-implement based on naming
    List<Milestone> findByProjectId(String projectId);

}
