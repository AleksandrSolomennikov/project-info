package com.example.demo;
import jakarta.persistence.*;

/**
 * Will represent a race entity in the application
 * Contains the name, date, and circuit
 */
@Data // Generates Getters, Setters, toString, equals, and hashCode
@AllArgsConstructor // Generates a constructor with all arguments
@NoArgsConstructor // Generates an empty constructor
@Builder // Provides a builder() method to build objects
@Entity
@Table(name = "races")
public class Race {
    @Id // 
    @GeneratedValue(strategy = GenerationType.AUTO) // Auto-generate the primary key
    private Long id;

    private String name;
    private String date;
    private String circuit;

}

