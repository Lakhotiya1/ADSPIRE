require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Inquiry Form Endpoint
app.post('/send-inquiry', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    try {
        let transporter = nodemailer.createTransport({
            service: "gmail",  // Gmail use kar raha hoon, tu apne hisaab se change kar sakta hai
            auth: {
                user: process.env.EMAIL,   // Tera email
                pass: process.env.PASSWORD // Tera email password or app password
            }
        });

        let mailOptions = {
            from: process.env.EMAIL,
            to: process.env.NOTIFY_EMAIL, // Jis email pe notification chahiye
            subject: "New Inquiry Received",
            html: `<h2>New Inquiry Details:</h2>
                   <p><b>Name:</b> ${name}</p>
                   <p><b>Email:</b> ${email}</p>
                   <p><b>Message:</b> ${message}</p>`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: "Inquiry sent successfully!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send email!" });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});