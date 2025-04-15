const { App } = require('@slack/bolt');
require('dotenv').config();

const app = new App({
    token: process.env.BOT_USER_OAUTH_TOKEN,
    signingSecret: process.env.SIGNING_SECRET
});

(async () => {
    // Start APP
    await app.start(process.env.PORT || 3000);
    // Info Log
    app.logger.info('⚡️ Bolt app is running!');
})();

app.event('message', async ({ event, say, client, view }) => {
    say('Ciao a tutti')
});

// Listen to the app_home_opened event, and when received, respond with a message including the user being messaged
app.event('app_home_opened', async ({ event, say, client, view }) => {

    app.logger.info('⚡️Hello! Someone just opened the app to DM so we will send them a message!');
    say(`Hello world and <@${event.user}>! `);
    const date = new Date();
    setTimeout(async () => {
        say(`This is current date <@${date}>! `);
    }, 2000);

    // Design App HOME TAB
    try {
        /* view.publish is the method that your app uses to push a view to the Home tab */
        await client.views.publish({

            /* the user that opened your app's app home */
            user_id: event.user,

            /* the view object that appears in the app home*/
            view: {
                type: 'home',
                blocks: [
                    {
                        type: 'header',
                        text: {
                            type: 'plain_text',
                            text: ':palm_tree: Hola dipendente :palm_tree:',
                            emoji: true
                        }
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: '*Vins* ti da il Benvenuto!! Ma... prima di perderci in convenevoli... \n *Ti sei ricordato di rendicontare :interrobang:*',
                        }
                    }
                ]
            }
        });
    }

    catch (error) {
        console.error(error);
    }
});

// Listen for a slash command invocation
app.command('/referenti', async ({ ack, body, client, logger }) => {
    // Acknowledge the command request
    await ack();
    const inputNames = ['Giovanni Colacitti'];
    const usersList = await client.users.list();
    const matchedUsers = usersList.members.filter(u =>
        inputNames.includes(u.real_name.toLowerCase()) || inputNames.includes(u.name.toLowerCase())
    );
    const formattedNames = matchedUsers.map(u => `<@${u.id}>`).join('\\n');

    console.log('Comando REFERENTI richiamato', matchedUsers);

    try {
        // Call views.open with the built-in client
        client.chat.postMessage({
            channel: body.channel_id,
            text: 'Testo',
            blocks: [
                {
                    'type': 'section',
                    'text': {
                        'type': 'mrkdwn',
                        'text': ':wave: Ciao Ragazzo, sono felice di darti questa informazione.\n\n*Di seguito i nostri referenti:*'
                    }
                },
                {
                    'type': 'divider'
                },
                {
                    'type': 'section',
                    'text': {
                        'type': 'mrkdwn',
                        'text': `*Front End*\nQui abbiamo il fantastico *Giovanni Colacitti*!! ${formattedNames} They have something for everyone here`
                    },
                    'accessory': {
                        'type': 'image',
                        'image_url': 'https://kinsta.com/it/wp-content/uploads/sites/2/2021/12/front-end-developer-1024x512.png',
                        'alt_text': 'alt text for image'
                    }
                },
                {
                    'type': 'section',
                    'text': {
                        'type': 'mrkdwn',
                        'text': '*Back End*\nQui abbiamo il Sexy *Aristide Cittadino*!!'
                    },
                    'accessory': {
                        'type': 'image',
                        'image_url': 'https://www.codemotion.com/magazine/wp-content/uploads/2024/02/image-2.png',
                        'alt_text': 'alt text for image'
                    }
                },

                {
                    'type': 'section',
                    'text': {
                        'type': 'mrkdwn',
                        'text': '*Sistemi*\nQui abbiamo il poliedrico *Marco Brunet*!!'
                    },
                    'accessory': {
                        'type': 'image',
                        'image_url': 'https://www.unidprofessional.com/wp-content/uploads/2022/06/sistemista-chi-e-di-cosa-si-occupa-come-diventarlo.jpg',
                        'alt_text': 'alt text for image'
                    }
                },
                {
                    "type": "divider"
                }
            ]
        });;
    }
    catch (error) {
        console.error('Errore nel comando');
        logger.error(error);
    }
});

// Listen for a slash command invocation
app.command('/help', async ({ ack, body, client, logger }) => {
    // Acknowledge the command request
    await ack();
    console.log('Comando HELP richiamato');

    try {
        // Call views.open with the built-in client
        client.chat.postMessage({
            channel: body.channel_id,
            text: 'Testo',
            blocks: [
                {
                    'type': 'section',
                    'text': {
                        'type': 'mrkdwn',
                        'text': 'Ciao Ragazzo :wave:\n*di seguito la lista dei comandi utili:*'
                    }
                },
                {
                    'type': 'divider'
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "> /referenti\n> _Tutti i mentori a tua disposizione, contatta uno di loro per supporto operativo_"
                    }
                },
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: "> /tools\n> _Tutti gli strumenti aziendali, utilizza quelli che fanno al caso tuo_"
                    }
                },
                {
                    "type": "divider"
                },
            ]
        });;
    }
    catch (error) {
        console.error('Errore nel comando');
        logger.error(error);
    }
});

// Listen for a slash command invocation
app.command('/tools', async ({ ack, body, client, logger }) => {
    // Acknowledge the command request
    await ack();
    console.log('Comando TOOLS richiamato');

    try {
        // Call views.open with the built-in client
        client.chat.postMessage({
            channel: body.channel_id,
            text: 'Testo',
            blocks: [
                {
                    'type': 'section',
                    'text': {
                        'type': 'mrkdwn',
                        'text': ':wave: Ciao Ragazzo, sono felice di darti questa informazione.\n\n*Di seguito gli strumenti a nostra disposizione:*'
                    }
                },
                {
                    'type': 'divider'
                },
                {
                    'type': 'section',
                    'text': {
                        'type': 'mrkdwn',
                        'text': `*Jira*\n_Strumento per la gestione dei task_!!`
                    },
                    'accessory': {
                        'type': 'image',
                        'image_url': 'https://play-lh.googleusercontent.com/_AZCbg39DTuk8k3DiPRASr9EwyW058pOfzvAu1DsfN9ygtbOlbuucmXaHJi5ooYbokQX',
                        'alt_text': 'alt text for image'
                    }
                },
                {
                    'type': 'section',
                    'text': {
                        'type': 'mrkdwn',
                        'text': `*Confluence*\n_Strumento per la gestione delle documentazioni_!!`
                    },
                    'accessory': {
                        'type': 'image',
                        'image_url': 'https://play-lh.googleusercontent.com/-aex9dK8-hchgNFf5lsMCy0_9sl6kK_JIS4nh-6p3_NG9w2BwASOTRsNg-tgnONg8Q',
                        'alt_text': 'alt text for image'
                    }
                },
                {
                    "type": "actions",
                    "block_id": "actionblock_x",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Google"
                            },
                            "url": "https://www.google.com"
                        }
                    ]
                },
                {
                    "type": "divider"
                }
            ]
        });
    }
    catch (error) {
        console.error('Errore nel comando');
        logger.error(error);
    }
});

app.action('open_site_button', async ({ ack, body, client }) => {
    console.log('Action OPEN SITE BUTTON richiamato');
    await ack();

    const channel = body.channel.id;
    const messageTs = body.message.ts;

    await client.chat.update({
        channel: channel,
        ts: messageTs,
        blocks: [
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: "🔗 <https://acsoftware.it|Clicca qui per aprire ACSoftware.it>"
                }
            }
        ],
        text: "Link aggiornato"
    });
});
