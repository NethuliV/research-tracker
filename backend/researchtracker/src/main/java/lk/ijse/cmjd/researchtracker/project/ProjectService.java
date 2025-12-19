package lk.ijse.cmjd.researchtracker.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(String id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
    }

    public Project createProject(Project project) {
        project.setId(UUID.randomUUID().toString());
        project.setCreatedAt(LocalDateTime.now());
        project.setUpdatedAt(LocalDateTime.now());
        // Assuming pi is set by controller (e.g., current user)
        return projectRepository.save(project);
    }

    public Project updateProject(String id, Project updatedProject) {
        Project existingProject = getProjectById(id);
        existingProject.setTitle(updatedProject.getTitle());
        existingProject.setSummary(updatedProject.getSummary());
        existingProject.setStatus(updatedProject.getStatus());
        existingProject.setTags(updatedProject.getTags());
        existingProject.setStartDate(updatedProject.getStartDate());
        existingProject.setEndDate(updatedProject.getEndDate());
        // pi should not be updated casually; handle if needed
        existingProject.setUpdatedAt(LocalDateTime.now());
        return projectRepository.save(existingProject);
    }

    public Project updateStatus(String id, Status status) {
        Project existingProject = getProjectById(id);
        existingProject.setStatus(status);
        existingProject.setUpdatedAt(LocalDateTime.now());
        return projectRepository.save(existingProject);
    }

    public void deleteProject(String id) {
        projectRepository.deleteById(id);
    }
}