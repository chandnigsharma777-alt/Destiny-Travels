
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import destinationRoutes from "./routes/destinationRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Destiny Travels API is running");
});

// Temporary test route
app.post("/test", (req, res) => {
    res.send("POST route is working");
});

// Destination routes
app.use("/api/destinations", destinationRoutes);

const startServer = async () => {
    try {
        await connectDB();

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error.message);
    }
};

startServer();
// Error handling middleware
app.use((err, req, res, next) => {
    if (err.name === "ValidationError") {
        return res.status(400).json({
            message: err.message
        });
    }

    res.status(500).json({
        message: err.message
    });
});