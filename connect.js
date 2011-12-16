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

String.prototype.startsWith = function(prefix) {
    return this.indexOf(prefix) == 0;
};

function chat_message(msg) {
    return msg.getChild('body').children[0];
}

function send_message(msg) {
    conn.send(new xmpp.Element('message', {
        to: room_jid,
        type: 'groupchat'
    }).
    c('body').t(msg)
    );
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
    }).
    c('history', {
        //disable history so you don't receive old messages.
        maxstanzas: 0,
        seconds: 1
    })
    );

    // bot says hello to the chat room.
    send_message('Hey, devs...');
});

// bind to the stanza event stream, and respond only for message stanzas
conn.on('stanza',
function(stanza) {
    if (stanza.is('message')
    && stanza.attrs.type === 'groupchat'
    && !stanza.attrs.from.endsWith(room_bot_nick)) {
        var msg = chat_message(stanza);
        console.log(msg);

        if (msg.startsWith("/r last")) {
            send_message('review not found');
        }
    }
});

conn.on('error',
function(e) {
    console.log(e);
});


