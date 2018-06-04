const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json())

const publicVapidKey = process.env.Public_Key;
const privateVapidKey = process.env.Private_Key;

webPush.setVapidDetails('mailto:tanveer@tanveer.com', publicVapidKey, privateVapidKey)


// Subscribe POST route
app.post('/subscribe', (req, res)=>{

    // Get Subsciption Object
    const subsciption = req.body;
    
    // Send 201 - resource created
    res.status(201).json({message:"resource created"})

    // Create Payload
    const payload = JSON.stringify({title:"Push Test"})

    // Pass object into sendNotification
    webPush.sendNotification(subsciption, payload)
    .catch(err => console.log(err))
})

app.listen(3002, ()=> { console.log("Server started at 3002") });