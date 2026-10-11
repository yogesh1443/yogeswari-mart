const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("YOGESWARI MART Backend is Working!");
});

app.get("/api/products", (req, res) => {
    res.json({
        message: "Products API is working"
    });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});