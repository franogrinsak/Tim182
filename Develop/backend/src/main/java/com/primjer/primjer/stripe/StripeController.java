package com.primjer.primjer.stripe;
import com.primjer.primjer.stripe.StripeRequest;
import com.primjer.primjer.stripe.StripeResponse;
import com.primjer.primjer.stripe.StripeService;
import com.primjer.primjer.user.User;
import com.primjer.primjer.user.UserRepository;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;


@RestController
public class StripeController {

    @Value("${stripe.secretKey}")
    private String secretKey;
    @Value("${stripe.webHookKey}")
    private String WHKey;

    private StripeService stripeService;
    private UserRepository userRepo;

    public StripeController(StripeService stripeService, UserRepository userRepo) {
        this.stripeService = stripeService;
        this.userRepo = userRepo;
    }
    @Secured({"ROLE_PLAYER","ROLE_UNPAID_OWNER"})
    @PostMapping("/checkout")
    public ResponseEntity<StripeResponse> checkoutProducts(@RequestBody StripeRequest stripeRequest, OAuth2AuthenticationToken token) throws StripeException {
        if(stripeRequest.getName().equals("Clanarina")){
            String email=token.getPrincipal().getAttribute("email");
            User user= userRepo.getUser(email);
            stripeRequest.setUserId(user.getUserId());
        }
        StripeResponse stripeResponse = stripeService.checkoutProducts(stripeRequest);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(stripeResponse);
    }
    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        Stripe.apiKey = secretKey;
        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, WHKey);

            if("checkout.session.completed".equals(event.getType())){
                Session session = (Session) event.getData().getObject();
                if(session.getMetadata().get("type-pay").equals("Rezervacija")){
                    String userId = session.getMetadata().get("userId");
                    String timeSlotId = session.getMetadata().get("timeSlotId");
                    stripeService.updateDTB(session.getId(),Integer.valueOf(userId),Integer.valueOf(timeSlotId));
                }
                else if(session.getMetadata().get("type-pay").equals("Clanarina")){
                    String userId = session.getMetadata().get("userId");
                    stripeService.updateDATABASE(session.getId(),Integer.valueOf(userId));
                }
            }
            return ResponseEntity.ok("Webhook handled successfully");
        } catch (SignatureVerificationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Webhook processing failed");
        }

    }

}
