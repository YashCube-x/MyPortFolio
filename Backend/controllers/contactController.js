import Contact from "../models/Contact.js";
import nodemailer from "nodemailer";

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (error) {
    console.error("Get Contacts Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const markContactRead = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: req.body.read ?? true },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    console.error("Mark Contact Read Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }
    res.json({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error("Delete Contact Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 1️⃣ Save to DB
    const newContact = await Contact.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    // 2️⃣ Email Transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3️⃣ FORMATTED EMAIL TEMPLATE
    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color:#333;">📩 New Contact Form Submission</h2>
        <hr />

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>

        <h3>Message:</h3>
        <p style="background:#f5f5f5; padding:10px; border-radius:5px;">
          ${message}
        </p>

        <hr />
        <p style="font-size:12px; color:#777;">
          This message was sent from your portfolio contact form.
        </p>
      </div>
    `;

    // 4️⃣ Send Email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `📩 New Contact Form Submission - ${subject}`,
      html: emailTemplate,
    });

    // Response
    res.status(201).json({
      success: true,
      message: "Message saved & email sent in proper format",
      data: newContact,
    });
  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
