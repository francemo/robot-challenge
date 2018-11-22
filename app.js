var rp         = require("request-promise"),
    express    = require('express'),
    router     = express(),
    bodyParser = require("body-parser"),
    middlewareObj = require("./middleware");
    //robotObj      = require("./models/robot");
    
router.set('view engine', 'ejs');
router.use(function(req, res, next){
   next();
});    
router.use(bodyParser.urlencoded({extended: true}));
router.use(express.static(__dirname + "/public"));

//router.use(function (req, res, next) {
//  process.on('unhandledRejection', function(reason) {
//    console.log("Unhandled Rejection:", reason.stack);
//    res.status(500).send('Unknown Error');
//    //or next(reason);
//  });
//  next();
//});

var options = {
    url: 'https://oke5yaeave.execute-api.us-west-2.amazonaws.com/prod/status',
    headers: {
        'x-api-key': 'vKjbzwMdzb4Yo8WkzkC7s23QzdKIqu7oa40eFJyY'
    }
};


//HOME ROUTE
router.get('/', function(req, res) {
    res.render('index', {word: undefined, targetTerm: undefined, notFound: false}); //
});

//SEARCH ROUTE
router.get('/search', function(req, res){
    res.render('search');
});

//SHOW RESULT ROUTE
router.post('/', middlewareObj.findTerm, function(req, res){
    res.setTimeout(180000);
    rp(options).then(function(currentWord){
        return JSON.parse(currentWord);
    }).then(function(currentWord){
        var targetTerm = req.body.word;
        var notFound = false;
        if(targetTerm.toLowerCase() !== currentWord.currentTerm.toLowerCase())
            notFound = true;
        res.render('index', {word: currentWord, targetTerm: targetTerm, notFound: notFound});
    });    
});


module.exports = router;