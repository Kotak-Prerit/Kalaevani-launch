const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the product name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter the product description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter the product pice"],
    maxLength: [7, "Price cannot exceed 7 digits"],
    minLength: [2, "Atleast 2 digit price is required"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  sizes: [
    {
      name: { type: String },
      quantity: { type: Number },
    },
  ],
  Stock: {
    type: Number,
    required: [true, "Please Enter the stock of the product"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 0,
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },

  fabric: {
    type: String,
    required: [true],
  },
  care: {
    type: String,
    required: [true],
  },
  artwork: {
    type: String,
    required: [true],
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        trim: true,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      reviewedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  color: {
    type: String,
    required: [true, "Please Enter Product Color"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to calculate Stock from sizes
productSchema.pre("save", function (next) {
  this.Stock = this.sizes.reduce(
    (total, size) => total + (size.quantity || 0),
    0
  );
  next();
});

module.exports = mongoose.model("Product", productSchema);
