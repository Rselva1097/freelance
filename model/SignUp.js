const mongoose = require("mongoose");

const signUpSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please provide a firstName"],
            maxlength: 50,
            minlength: 3
        },
        lastName: {
            type: String,
            required: [true, "Please provide a lastName"],
            maxlength: 50,
            minlength: 3
        },
        email: {
            type: String,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please provide a valid email',
              ],
            required: [true, "Please provide a email"],
            maxlength: 50,
            minlength: 3,
            unique:true,
        },

        phone: {
            type: String,
            required: [true, "Please provide a phone number"],
            maxlength: 10,
            minlength: 10
        },

        username: {
            type: String,
            required: [true, "Please provide a username"],
            unique:true,
            maxlength: 50,
            minlength: 3
        },

        password: {
            type: String,
            required: [true, "Please provide a password"],
            maxlength: 50,
            minlength: 3
        },

        address: {
            type: String,
            required: [true, "Please provide an address"],
            maxlength: 50,
            minlength: 3
        },

        userType: {
            type: String,
            enum :["Client","Freelancer"],
            required: [true, "Please provide userType"],
            maxlength: 50,
            minlength: 3
        },
        skills: {
            type: String
        }
    }
)

module.exports = mongoose.model('Users', signUpSchema);