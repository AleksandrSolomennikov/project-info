package com.example.demo;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface RaceRepository extends JpaRepository<Race, Long> {
    Race findByName(String name);
}
 