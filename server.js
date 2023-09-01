const express = require('express'); 
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser'); 
require('dotenv').config()

const pkg = require('@clerk/clerk-sdk-node');
const clerk = pkg;

clerk.setClerkApiKey(process.env.CLERK_SECRET_KEY)



const accountSid = process.env.TWILIO_ACCOUTN_SID;
const authToken = process.env.TWILIO_ACCOUTN_TOKEN;
const client = require('twilio')(accountSid, authToken);


const port = process.env.PORT || 5000;


app.use(bodyParser.json()) 
app.use(cors())

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


app.post('/get-users', async(req, res) => {
    const { email } = req.body 
    try {
        console.log(email)
        const data = await clerk.users.getUserList()
        const user = data.filter(i => {
            return i.emailAddresses[0].emailAddress == email
        })
 
        console.log(email)
        const deleteData = await clerk.users.deleteUser(user[0]?.id) 

        // if(deleteData)
        console.log(deleteData)
        
        res.json({"message": "Deleted Successfully  "})

    } catch (error) {
        console.log(error)
        res.status(400).json({"message": "Server Error"})
    } 
    // users.deleteUser('')
})
 
