package com.example.demo;
import jakarta.persistence.*;

@Entity
@Table(name = "races")
public class Race {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String date;
    private String circuit;

    // ✅ Пустой конструктор (важно для Spring Boot!)
    public Race() {}

    // ✅ Конструктор с параметрами
    public Race(String name, String date, String circuit) {
        this.name = name;
        this.date = date;
        this.circuit = circuit;
    }

    // ✅ Геттеры и сеттеры
    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDate() { return date; }
    public String getCircuit() { return circuit; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setDate(String date) { this.date = date; }
    public void setCircuit(String circuit) { this.circuit = circuit; }
}

