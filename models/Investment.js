const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const InvestmentSchema = new Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    tier: {
        type: String,
        enum: ["Gold", "Silver", "Diamond"],
    },
    duration: {
        type: String,
        default: "Two days",
    },
    amountInvested: {
        type: Number,
    },
    status: {
        type: String,
        default: "Active",
    },
}, { timestamps: true });

const Investment = mongoose.model("Investment", InvestmentSchema);

module.exports = Investment;