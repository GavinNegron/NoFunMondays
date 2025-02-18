const Contact = require('../../models/Contact')

const contactForm = async (req, res) => {
    const { email, name, message } = req.body;

    if (!email || !name || !message ) return res.status(400).json({ status: "Failed", message: "All fields are required."})

    try {
        const response = await Contact.create({ email, name, message});
        res.status(201).json({ status: "Success", message: "Message successfully sent."})
    } catch (error) {
        res.status(500).json({ status: "Failed", message: "Internal Server Error" });
    }
};


module.exports = { contactForm };