package com.example.demo;
import jakarta.persistence.*;
import java.util.*;

/**
 * Will represent a Sport entity in the application
 * Contains the name, date, and circuit
 */
@Data // Generates Getters, Setters, toString, equals, and hashCode
@AllArgsConstructor //  Generates a constructor with all arguments
@NoArgsConstructor // Generates an empty constructor
@Builder // Provides a builder() method to build objects
@Entity
public abstract class Sport {
    @Id // 
    @GeneratedValue(strategy = GenerationType.AUTO) // Auto-generate the primary key
    private Long id;
    private String name;
    private String category; //team, individual, or Motosport
    private String description;
    private LocalDateTime createDate; 
    private LocalDateTime updatedAt;
}

