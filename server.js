
var http      = require('http'),
    express   = require('express'),
    appRoutes = require("./app"),
    router    = express(),
    server    = http.createServer(router);

router.use(appRoutes);


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
