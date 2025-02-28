package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/races")
public class RaceController {
    private final RaceService raceService;

    public RaceController(RaceService raceService) {
        this.raceService = raceService;
    }

    @PostMapping("/add")
    public String addRace(@RequestBody Race race) {
        raceService.saveRace(race);
        return "Race added!";
    }

    @DeleteMapping("/delete/{id}")
    public String deleteRace(@PathVariable Long id) {
        raceService.deleteRace(id);
        return "Race deleted";
    }

    @GetMapping("/all")
    public List<Race> getAllRaces() {
        return raceService.getAllRaces();
    }
}
