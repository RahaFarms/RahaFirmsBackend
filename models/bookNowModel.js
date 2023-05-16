const mongoose = require("mongoose");

const bookNowModel = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    checkIn: { type: String, required: true },
    checkOut: { type: String, required: true },
    adults: { type: Number, required: true },
    children: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);


const BookNow = mongoose.model("Booking", bookNowModel);

module.exports = BookNow;
