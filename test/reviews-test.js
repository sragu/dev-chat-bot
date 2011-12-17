var market = require('../lib/reviews.js');

market.get_last_review('com.facebook.katana', function(chunk) {
   var content = chunk.replace(")]}'", "");
   content = content.replace(/[\n\r\t]/g,'');
   
   var jsObject = JSON.parse(content);
   console.log(jsObject.htmlContent);
});