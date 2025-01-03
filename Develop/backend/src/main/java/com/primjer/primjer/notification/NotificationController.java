package com.primjer.primjer.notification;

import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
    public class NotificationController {
    private NotificationRepository notificationRepo;

    public NotificationController(NotificationRepository notificationRepo) {
        this.notificationRepo = notificationRepo;
    }

    @Secured({"ROLE_PLAYER"})
    @GetMapping("/notifications/get")
    public List<Notification> getNotifications(@RequestParam int userId) {
        return notificationRepo.getNotifications(userId);

    }

    @Secured({"ROLE_PLAYER"})
    @PostMapping("/notifications/mark")
    public void markNotifications(@RequestBody int[] notificationIds) {
        notificationRepo.markNotifications(notificationIds);

    }

    @Secured({"ROLE_PLAYER"})
    @PostMapping("/notifications/delete")
    public void deleteNotifications(@RequestBody int[] notificationIds) {
        notificationRepo.deleteNotifications(notificationIds);

    }

    @Secured({"ROLE_PLAYER"})
    @GetMapping("/notifications/unread")
    public boolean unreadNotifications(@RequestParam int userId) {
        return notificationRepo.unreadNotifications(userId);

    }

    @Secured({"ROLE_PLAYER"})
    @PostMapping("/notifications/subscribe")
    public void subscribed(@RequestParam int userId, @RequestParam boolean isSubscribedToTournaments ) {
        notificationRepo.subscribed(userId, isSubscribedToTournaments);

    }

    @Secured({"ROLE_PLAYER"})
    @GetMapping("/notifications/subscribed")
    public boolean getSubscribed(@RequestParam int userId ) {
        return notificationRepo.getSubscribed(userId);
    }
}
