const mongoose = require("mongoose");

const clientRequirementSchema = new mongoose.Schema(
    {
        projectName: {
            type: String,
            required: [true, "Please provide a projectName"],
            maxlength: 100,
            minlength: 5
        },
        description: {
            type: String,
            required: [true, "Please provide a description"],
            maxlength: 1000,
            minlength: 10
        },
        technology: {
            type: String,
            required: [true, "Please provide a technology"],
            maxlength: 1000,
        },
        budget: {
            type: Number,
            required: [true, "Please provide a budget"],
        },

        createdBy:{
            type: String,
            required: [true, "Please provide a budget"],
        },
        appliedList:{
            type:Array
        }
        
    },
    {timestamps:true}
)

module.exports = mongoose.model('Requirements', clientRequirementSchema);