var market = require('../lib/reviews.js');

market.get_last_review('com.facebook.katana', function(chunk) {
   console.log(chunk);
});