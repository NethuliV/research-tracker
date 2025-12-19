package lk.ijse.cmjd.researchtracker.project;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import lk.ijse.cmjd.researchtracker.user.User;
import lk.ijse.cmjd.researchtracker.user.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserRepository userRepository; // To fetch current user as PI

    @GetMapping
    public ResponseEntity<List<Project>> getAllProjects() {
        return ResponseEntity.ok(projectService.getAllProjects());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable String id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('PI', 'ADMIN')")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User pi = userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
        project.setPi(pi);
        return ResponseEntity.ok(projectService.createProject(project));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('PI', 'ADMIN')")
    public ResponseEntity<Project> updateProject(@PathVariable String id, @RequestBody Project project) {
        return ResponseEntity.ok(projectService.updateProject(id, project));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('PI', 'ADMIN')")
    public ResponseEntity<Project> updateStatus(@PathVariable String id, @RequestBody Status status) {
        return ResponseEntity.ok(projectService.updateStatus(id, status));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteProject(@PathVariable String id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}