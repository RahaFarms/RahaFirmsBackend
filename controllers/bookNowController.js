const asyncHandler = require("express-async-handler");
const bookNowModel = require("../models/bookNowModel");
const nodemailer = require("nodemailer")

const bookNowController = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    checkIn,
    checkOut,
    adults,
    children,
  } = req.body;

  if (
    !name ||
    !email ||
    !checkIn ||
    !checkOut ||
    !adults ||
    !children
  ) {
    res.status(400);
    throw new Error("Please Enter all the Feilds");
  }

  const newModel = await bookNowModel.create({
    name,
    email,
    checkIn,
    checkOut,
    adults,
    children,
  });
  if (newModel) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAILUSER,
        pass: process.env.EMAILPASSWORD,
      },
    });

    const mailOptions = {
      from: '"Raha Farms" <therahafarms@gmail.com>',
      to: email,
      subject: "Your Application",
      html: `<h4 style="font-size: 15px;">Hi ${name},</h4><br><img src="rahaImg.jpg"> <h5 style="font-size: 13px;">Thank you for choosing our Farm for your upcoming stay! We have received your booking form and are excited to confirm your reservation. Our team is diligently working to process your request and will reach out to you shortly with a confirmation email containing all the details of your booking.

      At our resort, we strive to provide an unforgettable experience for our guests. From luxurious accommodations to top-notch amenities and exceptional customer service, we aim to make your stay with us truly memorable.
      
      If you have any specific preferences or additional requests, please feel free to reach out to our dedicated customer support team at info@raharesorts.com. We'll be more than happy to assist you and ensure your stay exceeds your expectations.
      
      Once again, thank you for choosing our resort. We look forward to welcoming you and providing you with an exceptional stay. See you soon! </h5>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent:- ", info.response);
      }
    }); 
    res.status(201).json({
      _id: newModel._id,
      name: newModel.name,
      email: newModel.email,
      checkIn: newModel.checkIn,
      checkOut: newModel.checkOut,
      adults: newModel.adults,
      children: newModel.children
    });
  } else {
    res.status(400);
    throw new Error("Server error");
  }
});

module.exports = { bookNowController };
