package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController // Controller + ResponseBody (returns JSON)
@RequestMapping("/api/races")


public class RaceController {
    private final RaceService raceService;

    public RaceController(RaceService raceService) {
        this.raceService = raceService;
    }

    /**
     * Handles POST requests to save a new race
     * @param race the race entity to save
     * @return a message indicating that the race was saved 
     */
    @PostMapping("/add")
    public String addRace(@RequestBody Race race) {
        raceService.saveRace(race);
        return "Race added!";
    }

    /**
    * Handles DELETE requests to delete a race 
    * @param id the id of the race to delete
    * @return a message indicating that the race was deleted
    */
    @DeleteMapping("/delete/{id}")
    public String deleteRace(@PathVariable Long id) {
        raceService.deleteRace(id);
        return "Race deleted";
    }

    /**
     * Handles GET requests to retrieve all the races
     * @return a list of all the race entities
     */
    @GetMapping("/all")
    public List<Race> getAllRaces() {
        return raceService.getAllRaces();
    }

    /**
     * Handles PUT requests to update an existing race
     * @param id the id of the race
     * @param race the updated race
     * @return the updated race entity
     */

    @PutMapping("/update/{id}")
    public Race updateRace(@PathVariable("id") Long id, @RequestBody Race race){
        return raceService.updateRace(race, id);
    }
}
