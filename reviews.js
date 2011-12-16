// fetches reviews from the android market
var http = require('http');

var client = http.createClient(80, 'market.android.com');
var appId = 'com.facebook.katana';

exports.get_latest_reviews = function(appId, callback) {
    var request = client.request('POST', '/getreviews?id=' + appId + '&reviewType=1&reviewSortOrder=0&pageNum=0');
    request.write("");
    request.end();
    request.on("response", callback);
};