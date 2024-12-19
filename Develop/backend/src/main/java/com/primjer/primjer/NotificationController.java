package com.primjer.primjer;

import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.List;


@RestController
    public class NotificationController {
    private NotificationRepository notificationRepo;

    public NotificationController(NotificationRepository notificationRepo) {
        this.notificationRepo = notificationRepo;
    }

    @GetMapping("/notifications/get")
    public List<Notification> getNotifications(@RequestParam int userId) {
        return notificationRepo.getNotifications(userId);

    }

    @PostMapping("/notifications/mark")
    public void markNotifications(@RequestBody int[] notificationIds) {
        notificationRepo.markNotifications(notificationIds);

    }

    @PostMapping("/notifications/delete")
    public void deleteNotifications(@RequestBody int[] notificationIds) {
        notificationRepo.deleteNotifications(notificationIds);

    }

    @GetMapping("/notifications/unread")
    public boolean unreadNotifications(@RequestParam int userId) {
        return notificationRepo.unreadNotifications(userId);

    }

    @PostMapping("/notifications/subscribe")
    public void subscribed(@RequestParam int userId, @RequestParam boolean isSubscribedToTournaments ) {
        notificationRepo.subscribed(userId, isSubscribedToTournaments);

    }








}
