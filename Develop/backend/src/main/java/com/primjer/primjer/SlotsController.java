package com.primjer.primjer;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
public class SlotsController {
    private SlotsRepository slotsRepo;

    public SlotsController(SlotsRepository slotsRepo) {
        this.slotsRepo = slotsRepo;
    }
    @PostMapping("/slots/add")
    public ResponseEntity<List<Slot>> courtAdd(@RequestBody Slot slot){
        List<Slot> lista=slotsRepo.addSlot(slot);
        if(lista!=null){
            return ResponseEntity.badRequest()
                    .body(lista);
        }
        return null;
    }
    @PostMapping("slots/delete")
    public void deleteSlots(@RequestParam int timeSlotId){
        slotsRepo.delete(timeSlotId);
    }
    @PostMapping("slots/book")
    public void bookSlots(@RequestParam int timeSlotId,@RequestParam int userId){
        slotsRepo.book(timeSlotId,userId);
    }
    @PostMapping("slots/cancel")
    public ResponseEntity<Boolean> cancelSlots(@RequestParam int timeSlotId){
        boolean bool=slotsRepo.cancel(timeSlotId);
        if(!bool){
            return ResponseEntity.badRequest().body(bool);
        }
        return ResponseEntity.ok().body(bool);
    }
    @GetMapping("slots/get/owners")
    public List<Slot> getOSlots(@RequestParam int courtId,@RequestParam int userId){
        return slotsRepo.getO(courtId,userId);
    }
    @GetMapping("slots/get/players")
    public List<Slot> getPSlots(@RequestParam int courtId,@RequestParam int userId){
        return slotsRepo.getP(courtId,userId);
    }
}
