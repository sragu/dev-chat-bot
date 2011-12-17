var market = require('../lib/reviews.js');

// market.get_latest_reviews('com.facebook.katana', function(chunk) {
//    var content = chunk.replace(")]}'", "");
//    content = content.replace(/[\n\r\t]/g,'');
//    
//    var jsObject = JSON.parse(content);
//    console.log(jsObject.htmlContent);
// });


market.get_last_comment('com.facebook.katana', function(comment) {
    console.log(comment);
});



  // 
  // apricot.parse(content, function(err, doc) {
  //       // last_review = doc.top('doc-review').top('review-text').toHTML;
  //   });