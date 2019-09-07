# React Website
A frontend for [JsRamverk](https://jsramverk.me) project at BTH.

# Badges
[![Build Status](https://travis-ci.org/mabn17/ramverk2-server.svg?branch=master)](https://travis-ci.org/mabn17/ramverk2-server)

[![Build Status](https://scrutinizer-ci.com/g/mabn17/ramverk2-server/badges/build.png?b=master)](https://scrutinizer-ci.com/g/mabn17/ramverk2-server/build-status/master) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/mabn17/ramverk2-server/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/mabn17/ramverk2-server/?branch=master) [![Code Coverage](https://scrutinizer-ci.com/g/mabn17/ramverk2-server/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/mabn17/ramverk2-server/?branch=master)

## Requirements
[Server](https://github.com/mabn17/server-webb-trade-center)

## Installation
1. Clone the repo `git clone git@github.com:mabn17/ramverk2-client.git`.
2. Install the dependencies `cd webb-trade-center && npm install`
3. Start the app `npm start`

## Testing
1. To see reports from the unittests `npm test`
2. Tests with Selenium `npm run test:ci`

## Routes
***/*** - Home.  
***/about*** - About the company & project.  
***/login*** - The login page.  
***/register*** - The registration page.    
***/account*** - The users index page (user account).    
***/\*\**** - Catching unknown routes with an error message.  

###### Thanks
This website was made with material-ui and material-icons

#### TODO: 
1. Make it possible to add balance to the user (maybe add some kind of account manageing / better personal page)
2. Let the user sell items  
3. Let the user buy items  
4. See your items and bought items  
5. Realtime on add/edit items
