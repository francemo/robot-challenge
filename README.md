
## Running the server

    $ node server.js
    
## Folder           File                Explanation

                    `server.js`             Basic setup
                    `app.js`                Define the routes
    `middleware`    `index.js`              Main search functions
    `models`        `robot.js`              The requests allowed by robot models
                    `RobotStatus.js`        The returned object from remote API
                    
    `public`        `search.css`            The frontend stylesheet
    `views`         `/partials/header.ejs`  The common header in HTML files
                    `/partials/footer.ejs`  The common footer in HTML files
                    `index.ejs`             The home page
                    `search.ejs`            The search form
                    

