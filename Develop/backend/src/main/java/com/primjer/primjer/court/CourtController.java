package com.primjer.primjer.court;


import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CourtController {
    private CourtRepository courtRepo;

    public CourtController(CourtRepository courtRepo) {
        this.courtRepo = courtRepo;
    }

    @Secured({"ROLE_OWNER"})
    @PostMapping("/courts/add")
    public ResponseEntity<String> courtAdd(@RequestBody Court court){
        Integer n=courtRepo.addCourt(court);
        if(n==0){
            return ResponseEntity.status(400).body("That court name alrady exists");
        }
        return ResponseEntity.ok().build();
    }

    @Secured({"ROLE_OWNER","ROLE_PLAYER"})
    @GetMapping("/courts")
    public List<Court> getCourts(@RequestParam int userId){
        return courtRepo.getCourts(userId);
    }

    @Secured({"ROLE_PLAYER"})
    @GetMapping("/courts/all")
    public List<Court> getAllCourts(){
        return courtRepo.getAllCourts();
    }

    @Secured({"ROLE_OWNER","ROLE_PLAYER"})
    @GetMapping("/courts/court")
    public Court getCourt(@RequestParam int courtId){
        return courtRepo.getCourt(courtId);
    }

    @Secured({"ROLE_OWNER"})
    @PostMapping("/courts/edit")
    public ResponseEntity<String> courtEdit(@RequestBody Court court){
        int n = courtRepo.editCourt(court);

        if(n==0){
            return ResponseEntity.status(400).body("That court name alrady exists");
        }
        return ResponseEntity.ok().build();
    }

    @Secured({"ROLE_OWNER"})
    @GetMapping("/courts/imageless")
    public List<Court> getCourtsImageless(@RequestParam int userId){
        return courtRepo.getCourtsImageless(userId);
    }

}
