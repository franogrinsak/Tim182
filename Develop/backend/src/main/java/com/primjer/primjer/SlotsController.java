package com.primjer.primjer;

import org.springframework.web.bind.annotation.RestController;

@RestController
public class SlotsController {
    private SlotsRepository slotsRepo;

    public SlotsController(SlotsRepository slotsRepo) {
        this.slotsRepo = slotsRepo;
    }

}
