# React Website
A frontend for [JsRamverk](https://jsramverk.me) project at BTH.

# Badges
[![Build Status](https://travis-ci.org/mabn17/webb-trade-center.svg?branch=master)](https://travis-ci.org/mabn17/webb-trade-center)

[![Build Status](https://scrutinizer-ci.com/g/mabn17/webb-trade-center/badges/build.png?b=master)](https://scrutinizer-ci.com/g/mabn17/webb-trade-center/build-status/master) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/mabn17/webb-trade-center/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/mabn17/webb-trade-center/?branch=master) [![Code Coverage](https://scrutinizer-ci.com/g/mabn17/webb-trade-center/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/mabn17/webb-trade-center/?branch=master)

## Requirements
[Server](https://github.com/mabn17/server-webb-trade-center)

## Installation
1. Clone the repo `git clone git@github.com:mabn17/ramverk2-client.git`.
2. Install the dependencies `cd webb-trade-center && npm install`
3. Start the app `npm start`

## Testing
1. To see reports from the unittests `npm run test:ci`
2. Tests with Selenium `npm test`

**OBS** selenium requires your to have [Geckodriver](https://github.com/mozilla/geckodriver/releases) installed in your path.

### Selenium use-cases
..


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
