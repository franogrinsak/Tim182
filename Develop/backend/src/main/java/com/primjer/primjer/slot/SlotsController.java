package com.primjer.primjer.slot;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
public class SlotsController {
    private SlotsRepository slotsRepo;

    public SlotsController(SlotsRepository slotsRepo) {
        this.slotsRepo = slotsRepo;
    }

    @Secured({"ROLE_OWNER"})
    @PostMapping("/slots/add")
    public ResponseEntity<List<Slot>> courtAdd(@RequestBody Slot slot){
        if(slot.getStartTimestamp().compareTo(slot.getEndTimestamp())>=0){
            return ResponseEntity.status(400).build();
        }
        List<Slot> lista=slotsRepo.addSlot(slot);
        if(lista!=null){
            return ResponseEntity.badRequest()
                    .body(lista);
        }
        return ResponseEntity.ok().build();
    }

    @Secured({"ROLE_OWNER"})
    @PostMapping("slots/delete")
    public void deleteSlots(@RequestParam int timeSlotId){
        slotsRepo.delete(timeSlotId);
    }

    @Secured({"ROLE_PLAYER"})
    @PostMapping("slots/book")
    public void bookSlots(@RequestParam int timeSlotId,@RequestParam int userId) {
        slotsRepo.book(timeSlotId,userId);
    }


    @Secured({"ROLE_PLAYER"})
    @PostMapping("slots/cancel")
    public ResponseEntity<Boolean> cancelSlots(@RequestParam int timeSlotId){
        boolean bool=slotsRepo.cancel(timeSlotId);
        if(!bool){
            return ResponseEntity.badRequest().body(bool);
        }
        return ResponseEntity.ok().body(bool);
    }

    @Secured({"ROLE_OWNER","ROLE_PLAYER"})
    @GetMapping("slots/get/owners")
    public List<Slot> getOSlots(@RequestParam int courtId,@RequestParam int userId){
        return slotsRepo.getO(courtId,userId);
    }

    @Secured({"ROLE_OWNER","ROLE_PLAYER"})
    @GetMapping("slots/get/players")
    public List<Slot> getPSlots(@RequestParam int courtId,@RequestParam int userId){
        return slotsRepo.getP(courtId,userId);
    }
}
