let stripePubKey = 'pk_test_51OY2NhHl1AG3eyrQWatmYYsjLNaVdp8QWztoqdp9qJ2Ag10X4RBwelwws5UWrsQ33eZxfTTrtYX9vGLx5PYKYKZ500lLSozRfc';
let stripePriKey = 'sk_test_51OY2NhHl1AG3eyrQW3BMCY5rUQjIDVWsuLOz4GdvO1F43NnAClHa3JqwpjoxJAPuuOtdUWqsypKX0OUbFuoLn8SB00NOltF10e';

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const stripe = require('stripe')(stripePriKey);

app.get("/", (req, res, next) => {
  res.send('fare well my friend');
});

app.post('/payment-sheet', async (req, res, next) => {
  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2023-10-16'}
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'dollar',
    customer: customer.id,
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: stripePubKey
  });
});

let port = 3000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
})
