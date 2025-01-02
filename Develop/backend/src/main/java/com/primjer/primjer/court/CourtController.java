package com.primjer.primjer.court;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CourtController {
    private CourtRepository courtRepo;

    public CourtController(CourtRepository courtRepo) {
        this.courtRepo = courtRepo;
    }
    @PostMapping("/courts/add")
    public ResponseEntity<String> courtAdd(@RequestBody Court court){
        Integer n=courtRepo.addCourt(court);
        if(n==0){
            return ResponseEntity.status(400).body("That court name alrady exists");
        }
        return ResponseEntity.ok().build();
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
    @GetMapping("/courts/imageless")
    public List<Court> getCourtsImageless(@RequestParam int userId){
        return courtRepo.getCourtsImageless(userId);
    }

}
