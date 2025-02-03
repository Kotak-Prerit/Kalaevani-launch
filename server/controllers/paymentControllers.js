const catchAsyncError = require("../middleware/catchAsyncError");

exports.processPayment = catchAsyncError(async (req, res, next) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
    payment_capture: 1,
    notes: {
      company: "Kalaevani",
    },
  };

  try {
    const myPayment = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order_id: myPayment.id,
      amount: myPayment.amount,
      currency: myPayment.currency,
      payStatus: "created",
    });

    console.log(myPayment); // ✅ Fix incorrect variable name
  } catch (error) {
    console.error("Razorpay Order Error:", error);
    res.status(500).json({
      success: false,
      error: "Payment processing failed",
      message: error.message,
    });
  }
});

exports.sendRazorpayApiKey = catchAsyncError(async (req, res) => {
  res.status(200).json({ razorpayApiKey: process.env.RAZORPAY_API_KEY });
});

exports.verifyPayment = catchAsyncError(async (req, res) => {});
