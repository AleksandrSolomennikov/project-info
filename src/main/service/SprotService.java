package main.service;
import org.springframework.stereotype.Service;

/**
 * Service interface for Sport entity
 * Defines methods for CRUD operations and business logic
 */

public interface SportService {

    /**
     * Saves Sport entity
     * @param Sport 
     */

    void SaveSport(Sport Sport);

    /**
     * get all the Sports
     * @return List of all the Sports
     */
    List<Sport> getAllSports();

    /**
     * Updates an existing Sport entity
     * @param Sport the Sport which will be updated
     * @param id the id of the Sport that will be updated
     * @return the updated Sport entity
     */
    Sport updateSport(Sport Sport, Long id);

    /**
     * Deletes a Sport entity by it's id
     * @param id the id
     */
    void deleteSport(Long id);
}
