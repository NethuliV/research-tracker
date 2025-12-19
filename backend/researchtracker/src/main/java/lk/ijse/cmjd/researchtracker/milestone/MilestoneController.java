package lk.ijse.cmjd.researchtracker.milestone;

import lk.ijse.cmjd.researchtracker.user.User;
import lk.ijse.cmjd.researchtracker.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MilestoneController {

    @Autowired
    private MilestoneService milestoneService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/api/projects/{id}/milestones")
    public ResponseEntity<List<Milestone>> getMilestonesByProject(@PathVariable String id) {
        return ResponseEntity.ok(milestoneService.getMilestonesByProjectId(id));
    }

    @PostMapping("/api/projects/{id}/milestones")
    @PreAuthorize("hasAnyRole('MEMBER', 'PI', 'ADMIN')")
    public ResponseEntity<Milestone> addMilestone(@PathVariable String id, @RequestBody Milestone milestone) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();
        User createdBy = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        milestone.setCreatedBy(createdBy);
        return ResponseEntity.ok(milestoneService.createMilestone(id, milestone));
    }

    @PutMapping("/api/milestones/{id}")
    @PreAuthorize("hasAnyRole('MEMBER', 'PI', 'ADMIN')")
    public ResponseEntity<Milestone> updateMilestone(@PathVariable String id, @RequestBody Milestone milestone) {
        return ResponseEntity.ok(milestoneService.updateMilestone(id, milestone));
    }

    @DeleteMapping("/api/milestones/{id}")
    @PreAuthorize("hasAnyRole('PI', 'ADMIN')")
    public ResponseEntity<Void> deleteMilestone(@PathVariable String id) {
        milestoneService.deleteMilestone(id);
        return ResponseEntity.noContent().build();
    }
}