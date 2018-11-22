//------------------The operations defined by the robot model-----------------//

var options = {
    url: 'https://oke5yaeave.execute-api.us-west-2.amazonaws.com/prod',
};

var robotObj = {
    
    headers: {
        'x-api-key': 'vKjbzwMdzb4Yo8WkzkC7s23QzdKIqu7oa40eFJyY'
    },

    //CAMERA OPERATIONS
    getCurrentTerm: {
        url: options.url + '/status'
    },
    
    
    moveToNextTerm: {
        url: options.url + '/move-to-next-term'
    },
    
    
    moveToPreviousTerm: {
        url: options.url + '/move-to-previous-term'
    },
    
    jumpToFirstTerm: {
        url: options.url + '/jump-to-first-term'
    },
    
    jumpToLastTerm: {
        url: options.url + '/jump-to-last-term'
    },
    
    
    
    //ARM OPERATIONS
    moveToNextPage: {
        url: options.url + '/move-to-next-page'
    },
    
    moveToPreviousPage: {
        url: options.url + '/move-to-previous-page'
    },
    
    jumpToFirstPage: {
        url: options.url + '/jump-to-first-page'
    },
    
    jumpToLastPage: {
        url: options.url + '/jump-to-last-page'
    }

};

module.exports = robotObj;