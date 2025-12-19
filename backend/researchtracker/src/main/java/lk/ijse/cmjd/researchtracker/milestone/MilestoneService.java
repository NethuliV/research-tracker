package lk.ijse.cmjd.researchtracker.milestone;

import lk.ijse.cmjd.researchtracker.project.Project;
import lk.ijse.cmjd.researchtracker.project.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class MilestoneService {
    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public List<Milestone> getMilestonesByProjectId(String projectId) {
        return milestoneRepository.findByProjectId(projectId);
    }

    public Milestone getMilestoneById(String id) {
        return milestoneRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Milestone not found with id: " + id));
    }

    public Milestone createMilestone(String projectId, Milestone milestone) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + projectId));
        milestone.setId(UUID.randomUUID().toString());
        milestone.setProject(project);
        // Assuming createdBy is set by controller (current user)
        return milestoneRepository.save(milestone);
    }

    public Milestone updateMilestone(String id, Milestone updatedMilestone) {
        Milestone existingMilestone = getMilestoneById(id);
        existingMilestone.setTitle(updatedMilestone.getTitle());
        existingMilestone.setDescription(updatedMilestone.getDescription());
        existingMilestone.setDueDate(updatedMilestone.getDueDate());
        existingMilestone.setCompleted(updatedMilestone.isCompleted());
        return milestoneRepository.save(existingMilestone);
    }

    public void deleteMilestone(String id) {
        milestoneRepository.deleteById(id);
    }
}