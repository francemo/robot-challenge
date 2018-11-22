//----------------------------THE MIDDLEWARE FILE----------------------------//
//               Task: Find the term by making remote API calls              //
//              middlewareObj.findTerm() can be used in other files          //
//                Other functions are only used in this file.                //
//---------------------------------------------------------------------------//

var rp = require("request-promise");

//common info of different requests
var options = {
    url: 'https://oke5yaeave.execute-api.us-west-2.amazonaws.com/prod',
    headers: {
        'x-api-key': 'vKjbzwMdzb4Yo8WkzkC7s23QzdKIqu7oa40eFJyY'
    }
};

//temporary variable used in sending different requests to remote API
var newOption = {};
newOption.headers = options.headers;

var middlewareObj = {};

var targetTerm;

//Decide whether to start from the first page or from the last page by comparing 
//the difference of the ASCII value of the first letter with 'A' and 'Z'
middlewareObj.findTerm = function(req, res, next){
    console.log("--------------------New Search----------------------");
    targetTerm = req.body.word.toUpperCase();
    console.log("target is " + targetTerm);
    var disToA = targetTerm.charCodeAt(0) - 'A'.charCodeAt(0),
        disToZ = 'Z'.charCodeAt(0) - targetTerm.charCodeAt(0);

    if( disToA < disToZ){
        console.log("Search from the first page..");
        newOption.url = options.url + "/jump-to-first-page";
        rp.post(newOption).then(function(){
            newOption.url = options.url + "/jump-to-last-term";
            return rp.post(newOption);
        }).then(JSON.parse)
        .then(function(obj){
            return findPageFromBeginning(obj, next);
        }); 
    }else{
        console.log("Search from the last page..");
        newOption.url = options.url + "/jump-to-last-page";
        rp.post(newOption)
        .then(function(){
            newOption.url = options.url + "/jump-to-first-term";
            return rp.post(newOption);
        })
        .then(JSON.parse)
        .then(function(obj){
            return findPageFromEnd(obj, next);
        }); 
    }
    
};

//Find the page from the first page
function findPageFromBeginning(obj, next){
    if(cmp(targetTerm, obj.currentTerm) === 1){
        newOption.url = options.url + "/move-to-next-page";
        rp.post(newOption)
        .then(JSON.parse)
        .then(function(obj){
            //console.log("page " + obj.currentPageIndex);
            findPageFromBeginning(obj, next);
        });
    }else{
        console.log("Find page " + obj.currentPageIndex);
        searchTerm(obj, next);
     }
}

//Find the page from the last page
function findPageFromEnd(obj, next){
    if(cmp(targetTerm, obj.currentTerm) === -1){
        newOption.url = options.url + "/move-to-previous-page";
        rp.post(newOption)
        .then(JSON.parse)
        .then(function(obj){
            //console.log("page " + obj.currentPageIndex);
            findPageFromEnd(obj, next);
        });
    }else{
        console.log("Find page " + obj.currentPageIndex);
        searchTerm(obj, next);
    }
}


//compare two words lexicographically
function cmp(word1, word2){
    var l1 = word1.length;
    var l2 = word2.length;
    var i=0;
    while(i<l1 && i<l2){
        if(word1.charCodeAt(i) < word2.charCodeAt(i)){
            return -1;
        }else if(word1.charCodeAt(i) > word2.charCodeAt(i)){
            return 1;
        }
        i++;
    }
    
    if(i === l1 && i < l2)      
        return -1;
    else if(i < l1 && i === l2) 
        return 1;
    else                                            
        return 0;
    
}

//Return the number of same letters starting from the first digit in `word1` and
//`word2`
function commonDigitNum(word1, word2){
    var i=0;
    var l1 = word1.length;
    var l2 = word2.length;

    while(i < l1){
        if(word1.charAt(i) !== word2.charAt(i) || i === l2) 
            return i;
        i++;
    }
    return i;
}

//After find the correct page, decide the direction to find the correct term
//either from the first term or from the last term
function searchTerm(FirstWord, next){
    newOption.url = options.url + "/jump-to-last-term";
    rp.post(newOption)
    .then(JSON.parse)
    .then(function(LastWord){
        var simToFirst = commonDigitNum(targetTerm, FirstWord.currentTerm);
        var simToLast = commonDigitNum(targetTerm, LastWord.currentTerm);
        if(simToLast >= simToFirst){
            console.log("Search from the last item...");
           searchTermFromEnd(LastWord, next);
        }else{
            console.log("Search from the first item...");
            newOption.url = options.url + "/jump-to-first-term";
            rp.post(newOption)
            .then(JSON.parse)
            .then(function(FirstWord){
                searchTermFromBeginning(FirstWord, next);
            });
        }
    });
}

//Search the term from the last term
function searchTermFromEnd(LastWord, next){
    if(cmp(targetTerm, LastWord.currentTerm) === -1){
        newOption.url = options.url + "/move-to-previous-term";
        rp.post(newOption)
        .then(JSON.parse)
        .then(function(LastWord){
            searchTermFromEnd(LastWord, next);
        });
    }else{
        console.log("Found word!");
        next();
    }
}

//Search the term from the first term
function searchTermFromBeginning(FirstWord, next){
    if(cmp(targetTerm, FirstWord.currentTerm) === 1){
        newOption.url = options.url + "/move-to-next-term";
        rp.post(newOption)
        .then(JSON.parse)
        .then(function(FirstWord){
            //console.log(FirstWord.currentTerm);
            searchTermFromBeginning(FirstWord, next);
        });
    }else{
        console.log("Found word!");
        next();
    }
}


module.exports = middlewareObj;