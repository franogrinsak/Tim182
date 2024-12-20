import { Typography } from "@material-tailwind/react";
import React from "react";

export default function PaymentOptions(props) {
  const { payment, setPayment } = props;

  function onValueChange(event) {
    console.log(event.target.value);
    setPayment(event.target.value);
  }
  return (
    <div className="space-y-4">
      <Typography
        variant="small"
        color="blue-gray"
        className="mb-2 text-left font-medium"
      >
        Payment options
      </Typography>
      <div>
        <input
          type="radio"
          id="cash"
          name="payment"
          value="cash"
          className="peer hidden"
          defaultChecked
          required
          onClick={() => setPayment("cash")}
        />
        <label
          htmlFor="cash"
          className="block w-full cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-900 ring-1 ring-transparent peer-checked:border-gray-900 peer-checked:ring-gray-900"
        >
          <div className="block">
            <Typography className="font-semibold">Cash</Typography>
            <Typography className="font-normal text-gray-600">
              Pay when you arrive to the location.
            </Typography>
          </div>
        </label>
      </div>
      <div>
        <input
          type="radio"
          id="stripe"
          name="payment"
          value="stripe"
          className="peer hidden"
          onClick={() => setPayment("stripe")}
          required
        />
        <label
          htmlFor="stripe"
          className="block w-full cursor-pointer rounded-lg border border-gray-300 p-4 text-gray-900 ring-1 ring-transparent peer-checked:border-gray-900 peer-checked:ring-gray-900"
        >
          <div className="block">
            <Typography className="font-semibold">Stripe</Typography>
            <Typography className="font-normal text-gray-600">
              Use <strong className="text-gray-900">credit card </strong>
              or <strong className="text-gray-900">Paypal</strong>.
            </Typography>
          </div>
        </label>
      </div>
    </div>
  );
}
