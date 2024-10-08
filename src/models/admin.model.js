const mongoose = require("mongoose");
const logInSchema = new mongoose.Schema({
  role: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  cid: {
    type: String,
  },
  facebookToken: {
    type: String,
  },
  whatsappSession: {
    type: String,
  },
  fcmToken: String,
  paymentProof: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payment",
  },
  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teamMember",
    },
  ],

  myPipelines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pipeline",
    },
  ],

  myleads: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "lead",
    },
  ],

  myTemplates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "template",
    },
  ],

  name: {
    type: String,
    trim: true,
    max: 24,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    trim: true,
  },
  profilePicture: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  },
  address: {
    type: String,
    lowercase: true,
    trim: true,
  },
  city: {
    type: String,
    lowercase: true,
    trim: true,
  },
  state: {
    type: String,
    lowercase: true,
    trim: true,
  },
  countryCode: {
    type: String,
    lowercase: true,
    trim: true,
  },
  organizationName: { type: String },
  sector: { type: String },

  // Add a new field to track subscription level
  subscriptionLevel: {
    type: String,
    enum: ["free", "basic", "premium"],
    default: "free",
  },
  subscriptionExpiry: {
    type: Date, // Store the expiration date
  },
});

logInSchema.pre("save", function (next) {
  const maxTeams = {
    free: 3,
    basic: 7,
    premium: 1000,
  };

  const userSubscriptionLevel = this.subscriptionLevel;
  const maxAllowedTeams = maxTeams[userSubscriptionLevel] || 3; // Default to free

  if (this.teams.length > maxAllowedTeams) {
    const err = new Error(
      `Cannot add more than ${maxAllowedTeams} team members with ${userSubscriptionLevel} plan.`
    );
    return next(err);
  }
  if (userSubscriptionLevel === "free" && !this.subscriptionExpiry) {
    this.subscriptionExpiry = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000); // 15 days from now
  }
  next();
});

// Define the model
const logIncollection = mongoose.model("logIncollection", logInSchema);

module.exports = logIncollection;