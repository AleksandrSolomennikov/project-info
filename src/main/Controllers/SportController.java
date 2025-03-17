package com.example.demo;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController // Controller + ResponseBody (returns JSON)
@RequestMapping("/api/Sports")


public class SportController {
    private final Sportservice Sportservice;

    public SportController(Sportservice Sportservice) {
        this.Sportservice = Sportservice;
    }

    /**
     * Handles POST requests to save a new Sport
     * @param Sport the Sport entity to save
     * @return a message indicating that the Sport was saved 
     */
    @PostMapping("/add")
    public String addSport(@RequestBody Sport sport) {
        Sportservice.saveSport(Sport);
        return "Sport added!";
    }

    /**
    * Handles DELETE requests to delete a Sport 
    * @param id the id of the Sport to delete
    * @return a message indicating that the Sport was deleted
    */
    @DeleteMapping("/delete/{id}")
    public String deleteSport(@PathVariable Long id) {
        Sportservice.deleteSport(id);
        return "Sport deleted";
    }

    /**
     * Handles GET requests to retrieve all the Sports
     * @return a list of all the Sport entities
     */
    @GetMapping("/all")
    public List<Sport> getAllSports() {
        return Sportservice.getAllSports();
    }

    /**
     * Handles PUT requests to update an existing Sport
     * @param id the id of the Sport
     * @param Sport the updated Sport
     * @return the updated Sport entity
     */

    @PutMapping("/update/{id}")
    public Sport updateSport(@PathVariable("id") Long id, @RequestBody Sport sport){
        return Sportservice.updateSport(sport, id);
    }
}
