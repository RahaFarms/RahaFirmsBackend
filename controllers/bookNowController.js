const asyncHandler = require("express-async-handler");
const bookNowModel = require("../models/bookNowModel");

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
