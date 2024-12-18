package com.primjer.primjer;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;


import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class StripeService {
    private SlotsRepository slotsRepo;
    private MembershipRepository mr;


    @Value("${stripe.secretKey}")
    private String secretKey;
    @Value("${frontend.url}")
    private String FRONTEND_URL;

    public StripeService(SlotsRepository slotsRepo, MembershipRepository mr) {
        this.slotsRepo = slotsRepo;
        this.mr = mr;
    }


    public StripeResponse checkoutProducts(StripeRequest stripeRequest) throws StripeException {

        Stripe.apiKey = secretKey;

        SessionCreateParams.LineItem.PriceData.ProductData productData =
                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                        .setName(stripeRequest.getName())
                        .build();
        String amount = "0.00";
        if(stripeRequest.getName().equals("Rezervacija")){
            amount=slotsRepo.getPrice(stripeRequest.getTimeSlotId());
        }
        else if(stripeRequest.getName().equals("Clanarina")){
            amount=mr.getPrice();
        }
        BigDecimal price = new BigDecimal(amount);
        long cents = price.movePointRight(2).longValue();
        SessionCreateParams.LineItem.PriceData priceData =
                SessionCreateParams.LineItem.PriceData.builder()
                        .setCurrency("EUR")
                        .setUnitAmount(cents)
                        .setProductData(productData)
                        .build();


        SessionCreateParams.LineItem lineItem =
                SessionCreateParams
                        .LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(priceData)
                        .build();
        String redirect_url=FRONTEND_URL+"/courts/"+stripeRequest.getOwnerId()+"/"+stripeRequest.getCourtId();
        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setSuccessUrl(redirect_url)
                        .setCancelUrl(redirect_url)
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
