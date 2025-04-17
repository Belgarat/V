require("dotenv").config();
const { App, ExpressReceiver } = require("@slack/bolt");
const rateLimit = require("express-rate-limit");

// ExpressReceiver ti permette di usare middleware Express (es. rate-limit)
const receiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  endpoints: "/slack/webhook",
});

receiver.router.use(
  "/slack/webhook",
  rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    message: "Masa roba, speta an cin!",
  })
);

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver,
});

// Risponde ai messaggi testuali (non bot, non file, non join)
app.event("message", async ({ event, say, logger }) => {
  if (!event.subtype && event.text) {
    logger.info(`Ciacole da ${event.user}: ${event.text}`);

    // Risposta nel canale
    await say({
      text: `Go sentìo: "${event.text}" – bel messaggio!`,
      thread_ts: event.ts // Se vuoi rispondere in thread
      // Rimuovi `thread_ts` se vuoi una risposta normale fuori dal thread
    });
  }
});

// Avvio dell'app
(async () => {
  const port = process.env.PORT || 3000;
  await app.start(port);
  console.log(`Te scolte sula porta ${port}`);
})();
