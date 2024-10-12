const express = require('express');
const mongoose = require('mongoose'); // <-- Add this line
const path = require('path');
const port = 5500;

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/digitalworld', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

app.use(express.urlencoded({ extended: true }))

const db = mongoose.connection
db.once('open', () => {
    console.log("mongodb connect successful");

})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phonenumber: String,
    message: String
})
app.post('/post', async (req, res) => {
    const { firstname: name, email, phone_number: phonenumber, message } = req.body;

    const user = new Users({
        name,
        email,
        phonenumber,
        message
    });

    await user.save();
    console.log(user);
    res.send("Form submission Successful");
});

const Users = mongoose.model("data", userSchema)

// Serve static files from the 'project1' folder
app.use(express.static(path.join(__dirname, 'project1')));

// Serve index.html when the root route is accessed
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'project1', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
