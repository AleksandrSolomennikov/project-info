package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * Provides logic for handling race-related operations
 */

@Service
public class RaceServiceImpl implements RaceService {
    @Autowired
    private RaceRepository raceRepository;

    // Saves the race entity
    @override
    public void saveRace(Race race) {
        raceRepository.save(race);
    }

    //Deletes the race by id 
    @override
    public void deleteRace(Long id) {
        raceRepository.deleteById(id);
    }

    //Retrieves all the races
    @override 
    public List<Race> getAllRaces() {
        return (List<Race>) raceRepository.findAll();
    }

    @override
    public Race updateRace(Race race, Long id){
        
    }  
}
