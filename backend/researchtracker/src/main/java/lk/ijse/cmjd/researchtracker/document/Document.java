package lk.ijse.cmjd.researchtracker.document;

import jakarta.persistence.*;
import lk.ijse.cmjd.researchtracker.project.Project;
import lk.ijse.cmjd.researchtracker.user.User;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Document {
    @Id
    private String id;
    @ManyToOne
    private Project project;
    private String title;
    private String description;
    private String urlOrPath;
    @ManyToOne
    private User uploadedBy;
    private LocalDateTime uploadedAt;
}