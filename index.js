const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const publicVapidKey = process.env.Public_Key;
const privateVapidKey = process.env.Private_Key;

webPush.setVapidDetails('mailto:tanveer@tanveer.com', publicVapidKey, privateVapidKey)

app.post('/subscribe', (req, res)=>{
    res.status(200).json({message:"Thanks"})
})

app.listen(3002);