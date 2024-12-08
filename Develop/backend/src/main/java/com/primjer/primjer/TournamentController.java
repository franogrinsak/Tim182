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
    public void tournamentAdd(@RequestBody Tournament tournament) {
        tournamentRepo.addTournament(tournament);
    }

    @GetMapping("/tournaments/all")
    public List<Tournament> getAllTournaments() {
        return tournamentRepo.getAllTournaments();
    }

    @GetMapping("/tournaments/owners")
    public List<Tournament> getOwnersTournaments(@RequestParam int userId) {
        return tournamentRepo.getOwnersTournaments(userId);


    }

    @PostMapping("/tournaments/finish")
    public void finishTournament(@RequestBody Tournament tournament) {
        tournamentRepo.finishTournament(tournament);
    }

    @GetMapping("/tournaments/get")
    public Tournament getTournaments(@RequestParam int tournamentId) {
        return tournamentRepo.getTournaments(tournamentId);
    }

    @PostMapping("/tournaments/signup")
    public void tournamentSignUp(@RequestBody Participations participations) {
        tournamentRepo.TournamentSignUp(participations);
    }

    @PostMapping("/tournaments/approve")
    public void approveTournament(@RequestBody Participations participations) {
        tournamentRepo.approveTournament(participations);
    }

    @PostMapping("/tournaments/deny")
    public void denyTournament(@RequestBody Participations participations) {
        tournamentRepo.denyTournament(participations);
    }

    @GetMapping("/tournaments/applications")
    public List<Participations> applicationsTournaments(@RequestParam int tournamentId) {
        return tournamentRepo.applicationsTournaments(tournamentId);
    }

   
}