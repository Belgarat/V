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

    console.log('MESSAGGIO:', event);

    const currentMessage = event.text.toLowerCase();

    switch (currentMessage) {
        case 'hola vins':
            say(`Ciao <@${event.user}>!!\nSono proprio io Vins\nche ne dici Sushi??`);
            break;
        case 'ciao vins':
            say(`Ciao <@${event.user}> :wave:\nRicorda che ci sono sempre se avete bisogno`);
            break;
        case 'vins permessi':
            say(`Certo ti riassumo le richieste di oggi\nL\'utente X ha richiesto 4:00h di Permessi per il giorno 17 Giusgno 2025 dalle 14:00 alle 18:00.`);
            break;
    }

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
                        'text': `*Front End*\nQui abbiamo il fantastico *Giovanni Colacitti*!!`
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
                    "type": "actions",
                    "block_id": "actionblock_jira",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Go to Jira"
                            },
                            "url": "https://www.atlassian.com/it/software/jira"
                        }
                    ]
                },
                {
                    'type': 'divider'
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
                    "block_id": "actionblock_confluence",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Go to Confluence"
                            },
                            "url": "https://www.atlassian.com/software/confluence"
                        }
                    ]
                },
                {
                    'type': 'divider'
                },
                {
                    'type': 'section',
                    'text': {
                        'type': 'mrkdwn',
                        'text': `*Udemy*\n_Il nostro canale di videocorsi_!!`
                    },
                    'accessory': {
                        'type': 'image',
                        'image_url': 'https://play-lh.googleusercontent.com/wKwW77zj6Gd-llTDakdjSDnWUPKSMDGXhnZSXel3A3qQSiM1cbDvuspBpQk15tiT9ik',
                        'alt_text': 'alt text for image'
                    }
                },
                {
                    "type": "actions",
                    "block_id": "actionblock_udemy",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "text": "Go to Udemy"
                            },
                            "url": "https://www.udemy.com/"
                        }
                    ]
                },
                {
                    'type': 'divider'
                }
            ]
        });
    }
    catch (error) {
        console.error('Errore nel comando');
        logger.error(error);
    }
});
