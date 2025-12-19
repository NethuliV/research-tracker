package lk.ijse.cmjd.researchtracker.user;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class User {
    @Id
    private String id;
    private String username;
    private String password;
    private String fullName;
    @Enumerated(EnumType.STRING)
    private UserRole role;
    private LocalDateTime createdAt;
}