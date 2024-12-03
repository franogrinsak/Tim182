package com.primjer.primjer;


import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TournamentController {
    private TournamentRepository tournamentRepo;

    public TournamentController(TournamentRepository tournamentRepo) {
        this.tournamentRepo = tournamentRepo;
    }
    @PostMapping("/tournaments/add")
    public void tournamentAdd(@RequestBody Tournament tournament){
        tournamentRepo.addTournament(tournament);
    }

    @GetMapping("/tournaments/all")
    public List<Tournament> getAllTournaments(){
        return tournamentRepo.getAllTournaments();
    }




}