package com.primjer.primjer;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;


import com.stripe.param.checkout.SessionCreateParams;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StripeService {
    private SlotsRepository slotsRepo;


    @Value("${stripe.secretKey}")
    private String secretKey;

    public StripeService(SlotsRepository slotsRepo) {
        this.slotsRepo = slotsRepo;
    }


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
                        .putMetadata("userId", String.valueOf(stripeRequest.getUserId()))
                        .putMetadata("timeSlotId", String.valueOf(stripeRequest.getTimeSlotId()))
                        .build();


        Session session = null;

        session = Session.create(params);



        StripeResponse sr=new StripeResponse();
        sr.setSessionId(session.getId());
        sr.setSessionUrl(session.getUrl());
        return sr;
    }
    @Transactional
    public void updateDTB(String sessionId, Integer userId, Integer timeSlotId) {
        try {
            Stripe.apiKey = secretKey;
            Session session = Session.retrieve(sessionId);
            System.out.println("USo sam 2");
            if ("paid".equals(session.getPaymentStatus())) {
                slotsRepo.book(timeSlotId,userId);
            } else {
                throw new RuntimeException("Payment not completed. Cannot update database.");
            }
        } catch (StripeException e) {
            throw new RuntimeException("Failed to retrieve session details from Stripe.", e);
        }
    }
}
