const xmpp = require('node-xmpp');
const util = require('util');

jid = 'bot@bot.com';
password = 'password1';
room_jid = 'devchat@conference.blankslate-sr5977.local',
room_nick = 'bot'

// Establish a connection
var conn = new xmpp.Client({
    jid         : jid,
    password    : password,
    host        : 'localhost',
    port        : 5222
});


conn.on('online', function(){
    console.log("ONLINE");

     conn.send(new xmpp.Element('presence', { to: room_jid +'/' + room_nick }).
             c('x', { xmlns: 'http://jabber.org/protocol/muc' })
               );

       conn.send(new xmpp.Element('message', { to: room_jid, type: 'groupchat' }).
               c('body').t('Hello All...')
                 );

});
conn.on('error', function(e) {
     console.log(e);
});
