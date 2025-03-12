require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { verifySlackSignature } = require("./utils");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Limita il numero di richieste al minuto per evitare sovraccarichi
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: "Masa roba, speta an cin!",
});
app.use("/slack/webhook", limiter);

app.post("/slack/webhook", verifySlackSignature, async (req, res) => {
    const { event } = req.body;
    console.log("Ho capì:", event);
    if (event && event.type === "message" && !event.subtype) {
        console.log(`Ciacole da ${event.user}: ${event.text}`);
    }
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Te scolte sula porta ${PORT}`);
});
