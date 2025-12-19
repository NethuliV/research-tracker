package lk.ijse.cmjd.researchtracker.project;

import jakarta.persistence.*;
import lk.ijse.cmjd.researchtracker.user.User;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
public class Project {
    @Id
    private String id;
    private String title;
    private String summary;
    @Enumerated(EnumType.STRING)
    private Status status;
    @ManyToOne
    private User pi;
    private String tags;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

enum Status {
    PLANNING, ACTIVE, ON_HOLD, COMPLETED, ARCHIVED
}