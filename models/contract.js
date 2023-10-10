const mongoose = require("mongoose");
const { modelName } = require("./user");

const ContactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requierd: [true, "Please provide User Id"],
    },
    contractorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contractor",
        requierd: [true, "Please provide Contractor Id"],
    },
    contractId: {
        type: Number,
        requierd: [true, "Please provide Contract Id"],
    },
    level: {
        type: Number,
        requierd: [true, "Please provide the Contract Level"],
    },
});

module.exports = mongoose.model("Contract", ContactSchema);
