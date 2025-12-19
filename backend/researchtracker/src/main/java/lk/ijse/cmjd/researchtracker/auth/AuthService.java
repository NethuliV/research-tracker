package lk.ijse.cmjd.researchtracker.auth;

import lk.ijse.cmjd.researchtracker.user.User;
import lk.ijse.cmjd.researchtracker.user.UserRepository;
import lk.ijse.cmjd.researchtracker.user.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private lk.ijse.cmjd.researchtracker.common.JwtUtil jwtUtil;

    public Map<String, String> signup(String username, String password, String fullName) {
        User user = new User();
        user.setId(UUID.randomUUID().toString());
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setFullName(fullName);
        user.setRole(UserRole.MEMBER);
        user.setCreatedAt(LocalDateTime.now());
        userRepository.save(user);
        
        String token = generateJwt(user);
        return Map.of(
            "token", token,
            "role", user.getRole().name()
        );
    }

    public Map<String, String> login(String username, String password) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        User user = userRepository.findByUsername(username).orElseThrow();
        
        String token = generateJwt(user);
        return Map.of(
            "token", token,
            "role", user.getRole().name()
        );
    }

    private String generateJwt(User user) {
        return jwtUtil.generateToken(user.getUsername(), user.getRole().name());
    }
}