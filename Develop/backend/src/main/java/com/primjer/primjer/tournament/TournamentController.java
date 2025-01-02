package com.primjer.primjer.tournament;


import com.primjer.primjer.model.Comment;
import com.primjer.primjer.model.Image;
import com.primjer.primjer.model.Participations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TournamentController {
    private TournamentRepository tournamentRepo;

    public TournamentController(TournamentRepository tournamentRepo) {
        this.tournamentRepo = tournamentRepo;
    }

    @Secured({"ROLE_OWNER"})
    @PostMapping("/tournaments/add")
    public ResponseEntity<String> tournamentAdd(@RequestBody Tournament tournament) {

        Integer n=tournamentRepo.addTournament(tournament);
        if(n==0){
            return ResponseEntity.status(400).body("That tournament name alrady exists");
        }
        return  ResponseEntity.ok().build();
    }

    @Secured({"ROLE_OWNER","ROLE_PLAYER"})
    @GetMapping("/tournaments/all")
    public List<Tournament> getAllTournaments() {
        return tournamentRepo.getAllTournaments();
    }

    @Secured({"ROLE_OWNER","ROLE_PLAYER"})
    @GetMapping("/tournaments/owners")
    public List<Tournament> getOwnersTournaments(@RequestParam int userId) {
        return tournamentRepo.getOwnersTournaments(userId);


    }

    @Secured({"ROLE_OWNER"})
    @PostMapping("/tournaments/finish")
    public void finishTournament(@RequestBody Tournament tournament) {
        tournamentRepo.finishTournament(tournament);
    }

    @Secured({"ROLE_OWNER","ROLE_PLAYER"})
    @GetMapping("/tournaments/get")
    public Tournament getTournaments(@RequestParam int tournamentId) {
        return tournamentRepo.getTournaments(tournamentId);
    }

    @Secured({"ROLE_PLAYER"})
    @PostMapping("/tournaments/signup")
    public void tournamentSignUp(@RequestBody Participations participations) {
        tournamentRepo.TournamentSignUp(participations);
    }

    @Secured({"ROLE_OWNER"})
    @PostMapping("/tournaments/approve")
    public void approveTournament(@RequestBody Participations participations) {
        tournamentRepo.approveTournament(participations);
    }

    @Secured({"ROLE_OWNER"})
    @PostMapping("/tournaments/deny")
    public void denyTournament(@RequestBody Participations participations) {
        tournamentRepo.denyTournament(participations);
    }

    @Secured({"ROLE_OWNER","ROLE_PLAYER"})
    @GetMapping("/tournaments/applications")
    public List<Participations> applicationsTournaments(@RequestParam int tournamentId) {
        return tournamentRepo.applicationsTournaments(tournamentId);
    }

    @Secured({"ROLE_OWNER","ROLE_PLAYER"})
    @GetMapping("/tournaments/application")
    public Participations applicationTournaments(@RequestParam int tournamentId, @RequestParam int userId) {
        return tournamentRepo.applicationTournaments(tournamentId, userId);
    }

    @Secured({"ROLE_OWNER","ROLE_PLAYER"})
    @GetMapping("/tournaments/applications/player")
    public List<Participations> applicationsplayerTournaments(@RequestParam int userId) {
        return tournamentRepo.applicationsplayerTournaments(userId);
    }

    @Secured({"ROLE_OWNER","ROLE_PLAYER"})
    @PostMapping("/tournaments/images/add")
    public void imageAdd(@RequestBody Image image) {
        tournamentRepo.imageAdd(image);
    }

    @Secured({"ROLE_OWNER","ROLE_PLAYER"})
    @GetMapping("/tournaments/images")
    public List<Image> getImages(@RequestParam int tournamentId) {
        return tournamentRepo.getImages(tournamentId);
    }

    @Secured({"ROLE_OWNER","ROLE_PLAYER"})
    @PostMapping("/tournaments/comments/add")
    public void commentAdd(@RequestBody Comment comment) {
        tournamentRepo.commentAdd(comment);
    }

    @Secured({"ROLE_OWNER","ROLE_PLAYER"})
    @GetMapping("/tournaments/comments")
    public List<Comment> getComments(@RequestParam int tournamentId) {
        return tournamentRepo.getComments(tournamentId);
    }



}