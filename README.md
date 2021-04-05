![GitHub actions workflow](https://github.com/machbarschaft/Machbarschaft-Frontend/actions/workflows/actions.yml/badge.svg)

# Machbarschaft-Frontend
ReactJS Frontend for Machbarschaft

## Prerequisites
The application requires NodeJS and npm as package manager
* [nodejs](https://nodejs.org/en/) - nodejs includes 
* [npm](https://www.npmjs.com/) (node package manager)

**IMPORTANT** Get a local API (backend) up and running as described here: [Machbarschaft API Project](https://github.com/machbarschaft/service-api-ng)

## Setup
### Dependencies
Install the required dependencies with npm
```
npm install
```

### Local Development
The local development version starts by

```
npm start
```
The backend ist expected to run at `http://localhost:8080`   

### Production Code
The code for staging or production resides in `dist` directory after it builds by running the command as follows:
```
npm build
```
The backend runs at (staging or production):

STA: `https://api-sta.machbarschaft.jetzt/v1/`   
PRD: `https://api.machbarschaft.jetzt/v1/`   

GitHub actions build the code, run tests and deploy it to the respective environments. For more information please review the workflow file in `.github/workflows`
