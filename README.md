# React Website
A frontend for [JsRamverk](https://jsramverk.me) project at BTH.  
**Reasons** behind the techniques chosen for both the frontend and the backend can be found [here](https://gist.github.com/mabn17/6d6016b1e5bce632f8cbdf7a29013fad).  

# Badges
[![Build Status](https://travis-ci.org/mabn17/webb-trade-center.svg?branch=master)](https://travis-ci.org/mabn17/webb-trade-center)

[![Build Status](https://scrutinizer-ci.com/g/mabn17/webb-trade-center/badges/build.png?b=master)](https://scrutinizer-ci.com/g/mabn17/webb-trade-center/build-status/master) [![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/mabn17/webb-trade-center/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/mabn17/webb-trade-center/?branch=master) [![Code Coverage](https://scrutinizer-ci.com/g/mabn17/webb-trade-center/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/mabn17/webb-trade-center/?branch=master)

## Requirements
[Server](https://github.com/mabn17/server-webb-trade-center)

## Installation
1. Clone the repo `git clone git@github.com:mabn17/webb-trade-center.git`.
2. Install the dependencies `cd webb-trade-center && npm install`
3. Change the congif values inside `.env`
3. Start the app `npm start` or build it for production `npm run build`

## Testing
1. To run the unittest and see the coverage report `npm run test:ci`
2. Tests with Selenium `npm test` (Requires `npm start` to be running on port 3000)

**OBS** selenium requires your to have [Geckodriver](https://github.com/mozilla/geckodriver/releases) installed in your path.

### Selenium use-cases (Project requirement 5)
#### The About-Page
1. Navigates to the account-page from the navlink and compares the urls.
2. Checks if the markdown content is rendering properly.

#### The Index-Page
1. Navigates to the account-page from the navlink and compares the urls.
2. Compares the document title to the .env files content.

#### The My-Account-Page
1. Opens the url /account and expects a redirect to /login if the user does not have a token.

#### The Login-Page
1. Navigates to /login from the signup button, then compares the urls
2. (+3) Tests two different email combinations to see if the correct error is displayed.
4. Tests to login with the worng password lenght to see if the correct error is displayed.
5. As the express server is not running, tests to login with correct validations to see if a "could not reach the server" error is displayed

#### The Register-Page
1. Navigates to register though the signup button then compares the urls.
2. Tries to register with an incorect password field to see if the correct error is displayed.
3. Tries to register with an empyt firstname field to see if the correct error is displayed.
3. (+4) Tries to register with an incorect email field to see if the correct error is displayed.
5. As the express server is not running, tests to login with correct validations to see if a "could not reach the server" error is displayed

###### Thanks
This website was made with recharts, markdown-to-jsx, material-ui and material-icons
