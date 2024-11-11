package com.primjer.primjer;


import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CourtController {
    private CourtRepository courtRepo;

    public CourtController(CourtRepository courtRepo) {
        this.courtRepo = courtRepo;
    }
    @PostMapping("/courts/add")
    public void courtAdd(@RequestBody Court court){
        courtRepo.addCourt(court);
    }
    @GetMapping("/courts")
    public List<Court> getCourts(@RequestParam int userId){
        return courtRepo.getCourts(userId);
    }
    @GetMapping("/courts/all")
    public List<Court> getAllCourts(){
        return courtRepo.getAllCourts();
    }
    @GetMapping("/courts/court")
    public Court getCourt(@RequestParam int courtId){
        return courtRepo.getCourt(courtId);
    }
    @PostMapping("/courts/edit")
    public void courtEdit(@RequestBody Court court){
        courtRepo.editCourt(court);
    }

}
