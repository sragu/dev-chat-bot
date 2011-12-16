// fetch reviews from the android market
var https = require('https');

var options = {
    host: 'market.android.com',
    port: 443,
    path: '/getreviews?id=com.facebook.katana&reviewType=1&reviewSortOrder=0&pageNum=0',
    method: 'POST',
    headers: { 'Content-lenght': 0 }   
};

exports.get_last_review = function(appId, callback) {
    options.path = '/getreviews?id=' + appId + '&reviewType=1&reviewSortOrder=0&pageNum=0';
    var request = https.request(options, function(response) {
        response.setEncoding('utf8');
        response.on('data', callback);
    });
    
    request.end();
};