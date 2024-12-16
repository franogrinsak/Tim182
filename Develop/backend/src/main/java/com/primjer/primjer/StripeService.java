package com.primjer.primjer;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;


import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
@Service
public class StripeService {

    @Value("${stripe.secretKey}")
    private String secretKey;


    public StripeResponse checkoutProducts(StripeRequest stripeRequest) throws StripeException {

        Stripe.apiKey = secretKey;

        SessionCreateParams.LineItem.PriceData.ProductData productData =
                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                        .setName(stripeRequest.getName())
                        .build();

        SessionCreateParams.LineItem.PriceData priceData =
                SessionCreateParams.LineItem.PriceData.builder()
                        .setCurrency(stripeRequest.getCurrency() != null ? stripeRequest.getCurrency() : "USD")
                        .setUnitAmount(stripeRequest.getAmount())
                        .setProductData(productData)
                        .build();


        SessionCreateParams.LineItem lineItem =
                SessionCreateParams
                        .LineItem.builder()
                        .setQuantity(stripeRequest.getQuantity())
                        .setPriceData(priceData)
                        .build();

        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl("http://localhost:8080/api")
                        .setCancelUrl("http://localhost:8080/")
                        .addLineItem(lineItem)
                        .build();


        Session session = null;

        session = Session.create(params);



        StripeResponse sr=new StripeResponse();
        sr.setSessionId(session.getId());
        sr.setSessionUrl(session.getUrl());
        return sr;
    }

    public void updateDTB(String sessionId) {
        try {
            Stripe.apiKey = secretKey;
            Session session = Session.retrieve(sessionId);

            if ("complete".equals(session.getPaymentStatus())) {
                // Update your database with reservation details
                // Example: reservationRepository.updatePaymentStatus(sessionId, "PAID");
                System.out.println("Payment successful. Updating database...");
            } else {
                throw new RuntimeException("Payment not completed. Cannot update database.");
            }
        } catch (StripeException e) {
            throw new RuntimeException("Failed to retrieve session details from Stripe.", e);
        }
    }
}
