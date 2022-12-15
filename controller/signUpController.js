const signUpSchema = require("../model/SignUp")
const { StatusCodes } = require("http-status-codes")

const createUser = async (req, res) => {
    try {
        const userObj = req.body;
        await signUpSchema.create(userObj);
        res.status(StatusCodes.CREATED).send({ msg: "signup successfully." });
    }
    catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "signup unsuccessfull.", reason: err.errors ? err.errors : err.errmsg })
    }
}

const login = async (req, res) => {
    const loginObj = req.body;
    try {
        const user = await signUpSchema.findOne({ email: loginObj.email, password: loginObj.password }, {});
        if (!user) {
            res.status(StatusCodes.BAD_REQUEST).send({ msg: "Invalid email or password." });
            return;
        }
        else {
            res.status(StatusCodes.OK).send(user);
        }
    }
    catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "login unsuccessfull.", reason: err.errors ? err.errors : err.errmsg })

    }

}

module.exports = { createUser, login };