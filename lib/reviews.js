// fetch reviews from the android market
var https = require('https');
var apricot = require('apricot').Apricot;

var options = {
    host: 'market.android.com',
    port: 443,
    path: '/getreviews?id=com.facebook.katana&reviewType=1&reviewSortOrder=0&pageNum=0',
    method: 'POST',
    headers: {
        'Content-lenght': 0
    }
};

var get_latest_reviews = function(appId, callback) {
    options.path = '/getreviews?id=' + appId + '&reviewType=1&reviewSortOrder=0&pageNum=0';
    var request = https.request(options,
    function(response) {
        response.setEncoding('utf8');

        var content = "";
        response.on('data',
        function(data) {
            content = content + data;
        });

        response.on('end',
        function() {
            callback.call(this, content);
        });

    });

    request.end();
};

var get_last_comment = function(appId, callback) {

    get_latest_reviews(appId,
    function(chunk) {
        var content = chunk.replace(")]}'", "");
        content = content.replace(/[\n\r\t]/g, '');
        var jsObject = JSON.parse(content);

        var last_review_comment = '';
        
        //too many nested functions :(
        apricot.parse(jsObject.htmlContent,
        function(err, doc) {
            var s = doc.find('p:first').each(function(el){
                last_review_comment = el.innerHTML;
                callback.call(this, last_review_comment);
              });
          });

    });
};

exports.get_last_comment = get_last_comment;
