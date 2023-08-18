const express = require('express'); 
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUTN_SID;
const authToken = process.env.TWILIO_ACCOUTN_TOKEN;
const client = require('twilio')(accountSid, authToken);


const port = process.env.PORT || 5000;

app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:5173'
}))

app.listen(port);

app.post('/send-sms', async(req, res) => { 

    const { number, message } = req.body
  
    try {
        
        const data = await client.messages
            .create({
                to: `+${number}`,
                body: message,
                from: '+18146373393',
            })
            
        res.json(data);

    } catch (error) {
        res.json(error)
    } 
})
 
