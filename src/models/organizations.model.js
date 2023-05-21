const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrgSchema = new Schema({
    org_name: String,
    address: String,
    tel: String,
    createAt: {
        type: Date,
        default: Date.Now
    },
})

module.exports = mongoose.model("Organization", OrgSchema);