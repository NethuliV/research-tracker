package lk.ijse.cmjd.researchtracker.auth;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class AuthServiceTest {

    @Autowired
    private AuthService authService;

    @Test
    void signupShouldReturnTokenAndRole() {
        var response = authService.signup("testuser_unit", "password123", "Unit Test");
        assertNotNull(response.get("token"));
        assertEquals("MEMBER", response.get("role"));
    }
}
