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

    try {
        // Call views.open with the built-in client
        const result = await client.views.open({
            // Pass a valid trigger_id within 3 seconds of receiving it
            trigger_id: body.trigger_id,
            // View payload
            view: {
                type: 'modal',
                // View identifier
                callback_id: 'view_1',
                title: {
                    type: 'plain_text',
                    text: 'Titolo della Modale'
                },
                blocks: [
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: 'Welcome to a modal with _blocks_'
                        },
                        accessory: {
                            type: 'button',
                            text: {
                                type: 'plain_text',
                                text: 'Click me!'
                            },
                            action_id: 'button_abc'
                        }
                    },
                    {
                        type: 'input',
                        block_id: 'input_c',
                        label: {
                            type: 'plain_text',
                            text: 'What are your hopes and dreams?'
                        },
                        element: {
                            type: 'plain_text_input',
                            action_id: 'dreamy_input',
                            multiline: true
                        }
                    }
                ],
                submit: {
                    type: 'plain_text',
                    text: 'Submit'
                }
            }
        });
        logger.info(result);
    }
    catch (error) {
        logger.error(error);
    }
});

// Listen for a button invocation with action_id `button_abc` (assume it's inside of a modal)
app.action('button_abc', async ({ ack, body, client, logger }) => {
    // Acknowledge the button request
    await ack();

    try {
        // Call views.update with the built-in client
        const result = await client.views.update({
            // Pass the view_id
            view_id: body.view.id,
            // Pass the current hash to avoid race conditions
            hash: body.view.hash,
            // View payload with updated blocks
            view: {
                type: 'modal',
                // View identifier
                callback_id: 'view_1',
                title: {
                    type: 'plain_text',
                    text: 'Modale Aggiornata'
                },
                blocks: [
                    {
                        type: 'section',
                        text: {
                            type: 'plain_text',
                            text: 'You updated the modal!'
                        }
                    },
                    {
                        type: 'image',
                        image_url: 'https://images.ctfassets.net/hrltx12pl8hq/7JnR6tVVwDyUM8Cbci3GtJ/bf74366cff2ba271471725d0b0ef418c/shutterstock_376532611-og.jpg',
                        alt_text: 'Yay! The modal was updated'
                    }
                ]
            }
        });
        logger.info(result);
    }
    catch (error) {
        logger.error(error);
    }
});
