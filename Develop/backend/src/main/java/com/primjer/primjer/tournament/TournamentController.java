package com.primjer.primjer.tournament;


import com.primjer.primjer.model.Comment;
import com.primjer.primjer.model.Image;
import com.primjer.primjer.model.Participations;
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

    @GetMapping("/tournaments/application")
    public Participations applicationTournaments(@RequestParam int tournamentId, @RequestParam int userId) {
        return tournamentRepo.applicationTournaments(tournamentId, userId);
    }

    @GetMapping("/tournaments/applications/player")
    public List<Participations> applicationsplayerTournaments(@RequestParam int userId) {
        return tournamentRepo.applicationsplayerTournaments(userId);
    }

    @PostMapping("/tournaments/images/add")
    public void imageAdd(@RequestBody Image image) {
        tournamentRepo.imageAdd(image);
    }

    @GetMapping("/tournaments/images")
    public List<Image> getImages(@RequestParam int tournamentId) {
        return tournamentRepo.getImages(tournamentId);
    }

    @PostMapping("/tournaments/comments/add")
    public void commentAdd(@RequestBody Comment comment) {
        tournamentRepo.commentAdd(comment);
    }

    @GetMapping("/tournaments/comments")
    public List<Comment> getComments(@RequestParam int tournamentId) {
        return tournamentRepo.getComments(tournamentId);
    }



}