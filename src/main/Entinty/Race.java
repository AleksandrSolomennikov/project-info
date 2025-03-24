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
public class Race extends Sport{
    @Id // 
    @GeneratedValue(strategy = GenerationType.AUTO) // Auto-generate the primary key
    private String circuit;
<<<<<<< HEAD

  
    public Race() {}

    public Race(String name, String date, String circuit) {
        this.name = name;
        this.date = date;
        this.circuit = circuit;
    } */

    // ✅ Getters and Setters
/*     public Long getId() { return id; }
    public String getName() { return name; }
    public String getDate() { return date; }
    public String getCircuit() { return circuit; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDate(String date) { this.date = date; }
    public void setCircuit(String circuit) { this.circuit = circuit; } */
=======
>>>>>>> 883d00ffa0bcdd28c08d0b05ee50599574346e62
}

