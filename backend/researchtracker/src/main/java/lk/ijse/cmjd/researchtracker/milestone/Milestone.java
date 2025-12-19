package lk.ijse.cmjd.researchtracker.milestone;

import jakarta.persistence.*;
import lk.ijse.cmjd.researchtracker.project.Project;
import lk.ijse.cmjd.researchtracker.user.User;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Milestone {
    @Id
    private String id;
    @ManyToOne
    private Project project;
    private String title;
    private String description;
    private LocalDate dueDate;
    private boolean isCompleted;
    @ManyToOne
    private User createdBy;
}