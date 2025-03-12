const crypto = require("crypto");

const verifySlackSignature = (req, res, next) => {
    const slackSignature = req.headers["x-slack-signature"];
    const requestTimestamp = req.headers["x-slack-request-timestamp"];
    const signingSecret = process.env.SLACK_SIGNING_SECRET;

    if (!slackSignature || !requestTimestamp) {
        return res.status(400).send("No ho catà el segn (firma per i non veneti) de Slack");
    }

    const baseString = `v0:${requestTimestamp}:${JSON.stringify(req.body)}`;
    const mySignature = `v0=${crypto.createHmac("sha256", signingSecret)
        .update(baseString)
        .digest("hex")}`;

    if (!crypto.timingSafeEqual(Buffer.from(mySignature), Buffer.from(slackSignature))) {
        console.log("Non te se tì, canaia!");
        return res.status(400).send("Te ha formà mal");
    }

    console.log("Brao bocia, te se tì, te pol pasar");
    next();
};

module.exports = { verifySlackSignature };
