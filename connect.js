const xmpp = require('node-xmpp');
const util = require('util');

jid = 'bot@bot.com';
password = 'password1';
room_jid = 'devchat@conference.blankslate-sr5977.local',
room_bot_nick = 'bot'

// Establish a connection
var conn = new xmpp.Client({
    jid: jid,
    password: password,
    host: 'localhost',
    port: 5222
});

String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

function chat_message(msg){
    return msg.getChild('body').children[0];
}

conn.on('online',
function() {
    console.log("ONLINE");

    // bot enters the chat room.
    conn.send(new xmpp.Element('presence', {
        to: room_jid + '/' + room_bot_nick
    }).
    c('x', {
        xmlns: 'http://jabber.org/protocol/muc'
    })
    );

    // bot greets the devs on join.
    conn.send(new xmpp.Element('message', {
        to: room_jid,
        type: 'groupchat'
    }).
    c('body').t('Hey, devs...')
    );
});

conn.on('stanza',
function(message) {
    if (message.attrs.type === 'groupchat' && !message.attrs.from.endsWith(room_bot_nick)) {
        console.log(chat_message(message));
    }
});

conn.on('error',
function(e) {
    console.log(e);
});


