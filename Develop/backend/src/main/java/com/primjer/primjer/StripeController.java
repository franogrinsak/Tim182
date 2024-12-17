package com.primjer.primjer;
import com.stripe.Stripe;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class StripeController {

    @Value("${stripe.secretKey}")
    private String secretKey;
    @Value("${stripe.webHookKey}")
    private String WHKey;

    private StripeService stripeService;

    public StripeController(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    @PostMapping("/product/v1/checkout")
    public ResponseEntity<StripeResponse> checkoutProducts(@RequestBody StripeRequest stripeRequest) throws StripeException {
        System.out.println("Daaaaa");
        StripeResponse stripeResponse = stripeService.checkoutProducts(stripeRequest);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(stripeResponse);
    }
    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        System.out.println("DADadada");
        Stripe.apiKey = secretKey;
        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, WHKey);

            if ("checkout.session.completed".equals(event.getType())) {
                Session session = (Session) event.getData().getObject();
                String userId = session.getMetadata().get("userId");
                String timeSlotId = session.getMetadata().get("timeSlotId");
                stripeService.updateDTB(session.getId(),Integer.valueOf(userId),Integer.valueOf(timeSlotId));
            }

            return ResponseEntity.ok("Webhook handled successfully");
        } catch (SignatureVerificationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Webhook processing failed");
        }

    }
    @GetMapping("/webhook")
    public String aaa(){
        return "aaaa";
    }
}
