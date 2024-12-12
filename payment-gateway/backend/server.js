const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure Razorpay instance
const razorpay = new Razorpay({
  key_id: 'rzp_test_c9kzuZZKKeWqbn', // Replace with your Razorpay Key ID
  key_secret: 'uAYRxZSIqayn1c3444flTNmd', // Replace with your Razorpay Key Secret
});

// API to create payment order
app.post('/create-order', async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise (convert to rupees on frontend)
      currency,
      receipt: `receipt_${Date.now()}`,
    });
    console.log('Order created:', order);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/payment/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
        console.log("id",id)
        const paymentDetails = await razorpay.payments.fetch(id);
      console.log('payment', paymentDetails);
      res.status(200).json(paymentDetails);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
app.listen(8000, () => console.log('Server running on port 5000'));
