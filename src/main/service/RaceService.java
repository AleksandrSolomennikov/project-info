package main.service;
import org.springframework.stereotype.Service;

/**
 * Service interface for race entity
 * Defines methods for CRUD operations and business logic
 */

public interface RaceService {

    /**
     * Saves Race entity
     * @param race 
     */

    void SaveRace(Race race);

    /**
     * get all the races
     * @return List of all the Races
     */
    List<Race> getAllRaces();

    /**
     * Updates an existing race entity
     * @param race the race which will be updated
     * @param id the id of the race that will be updated
     * @return the updated race entity
     */
    Race updateRace(Race Race, Long id);

    /**
     * Deletes a race entity by it's id
     * @param id the id
     */

    void deleteRace(Long id);
}
