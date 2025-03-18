const express = require("express");
const app = express();
const cors = require("cors");
const stripe = require("stripe")("pk_test_51QqwslPfORZMqnCyNpec2unq4gRzDXOJyVMy4O8dl1YDfP5XMvZVonfPMMaHGnOMpNe6BiNS1l57fdgY4swfJEE500esZM1IMP");
const connect = require("./Config/connectDB.js");
const bookings = require("./routes/bookingsRoute.js");
const users = require("./routes/userRoute.js");

const PORT = 3001;

// ✅ CORS Configuration
app.use(
  cors({
    origin: "*", // Allows all origins (for development)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ✅ Use Routes
app.use(bookings);
app.use(users);

// ✅ Start Server after DB Connection
async function startServer() {
  try {
    await connect.connectToServer();
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

// ✅ Stripe Payment Route
app.post("/your_server_endpoint", async (req, res) => {
  try {
    const { token } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: "usd",
      payment_method_types: ["card"],
      payment_method: token,
      confirm: true,
    });

    res.status(200).json({ success: true, client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Error processing payment." });
  }
});

startServer();