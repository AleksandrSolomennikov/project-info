package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RaceService {
    @Autowired
    private RaceRepository raceRepository;

    public void saveRace(Race race) {
        raceRepository.save(race);
    }

    public void deleteRace(Long id) {
        raceRepository.deleteById(id);
    }

    public List<Race> getAllRaces() {
        return raceRepository.findAll();
    }
}
