const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Client",
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
    title: {
        type: String,
        requierd: [true, "Please provide the Contract Title"],
    },
    description: {
        type: String,
        requierd: [true, "Please provide the Contract Description"],
    },
    locality: {
        type: String,
        requierd: [true, "Please provide the Contract Locality"],
    },
    budget: {
        type: Number,
        requierd: [true, "Please provide the Contract Budget"],
    },
    expectedStartDate: {
        type: Date,
        requierd: [true, "Please provide the Contract Expected Start Date"],
    },
    category: {
        type: String,
        requierd: [true, "Please provide the Contract Category"],
        emum: {
            values: [
                "Residential",
                "Commercial",
                "Industrial",
                "Infrastructure",
                "Type 1",
                "Type 2",
                "Type 3",
            ],
            message: "{VALUE} is not supported",
        },
    },
    status: {
        type: String,
        requierd: [true, "Please provide the Contract Status"],
        emum: {
            values: ["Initiated", "Pending", "Accepted", "Working", "Finished"],
            message: "{VALUE} is not supported",
        },
        default: "Initiated",
    },
});

module.exports = mongoose.model("Contract", ContactSchema);
