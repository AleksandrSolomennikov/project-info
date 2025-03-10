package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class RaceServiceImpl implements RaceService {

    private final String API_URL = "https://v1.formula-1.api-sports.io/";
    private final String API_KEY = "3fa8f8c74596ece2f5691b99bf3de060";

    private final RestTemplate restTemplate = new RestTemplate();

    @Autowired
    private RaceRepository raceRepository;

    @Override
    public void saveRace(Race race) {
        raceRepository.save(race);
    }

    @Override
    public void deleteRaceById(Long id) {
        raceRepository.deleteById(id);
    }

    @Override 
    public List<Race> getAllRaces() {
        String url = API_URL + "races";
        
        HttpHeaders headers = new HttpHeaders();
        headers.set("x-apisports-key", API_KEY);
        headers.set("x-apisports-host", "v1.formula-1.api-sports.io");

        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<Race[]> response = restTemplate.exchange(
            url, HttpMethod.GET, entity, Race[].class
        );

        return Arrays.asList(response.getBody());
    }

    @Override
    public Race getRaceByID(long id) {
        String url = API_URL + "races?id=" + id;

        HttpHeaders headers = new HttpHeaders();
        headers.set("x-rapidapi-key", API_KEY);
        headers.set("x-rapidapi-host", "v1.formula-1.api-sports.io");

        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<Race> response = restTemplate.exchange(url,
                                                             HttpMethod.GET,
                                                              entity, 
                                                              Race.class);
        
        return response.getBody();
    }

    @Override
    public Race updateRace(Race race, Long id) {
        if (raceRepository.existsById(id)) {
            race.setId(id);
            return raceRepository.save(race);
        }
        return null;
    }  
}
