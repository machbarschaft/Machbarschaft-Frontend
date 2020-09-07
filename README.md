[![Netlify Status](https://api.netlify.com/api/v1/badges/0c2fad00-9d82-406b-b675-072fa11a83ec/deploy-status)](https://app.netlify.com/sites/friendly-poincare-7a99cb/deploys)

# Machbarschaft-Frontend
ReactJS Frontend for Machbarschaft

## Prerequisites
Both for the back end and front end application check
* nodejs [official website](https://nodejs.org/en/) - nodejs includes [npm](https://www.npmjs.com/) (node package manager)

## Setup
**Install node dependencies**
```
npm install
```

**Start**  
Dev: 
```
npm start
```
The backend ist expected to run at 
```
http://localhost:3000
```
Prod:
```
npm build
```
The backend ist expected to run at 
```
https://api.demo.machbarschaft.jetzt/
```
Deploy on Netlify:
```
npm run-script build
```
Folder:
```
dist
```
Further Config:
```
Add IP 2 Cloudflare & Add Domain 2 Netlify
```
