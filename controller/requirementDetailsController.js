const clientRequirementSchema = require("../model/ClientRequirement")
const signUpSchema = require("../model/SignUp")

const { StatusCodes } = require("http-status-codes")

const createRequirement = async (req, res) => {
    try {
        const userObj = await signUpSchema.findById(req.body.createdBy)
        if (userObj) {
            await clientRequirementSchema.create(req.body);
            res.status(StatusCodes.CREATED).send({ msg: "job details created successfully." });
        }
        else {
            res.status(StatusCodes.BAD_REQUEST).send({ msg: "Invalid userid" });
        }
    }
    catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "job details creation failed.", reason: err.errors ? err.errors : err.errmsg })
    }
}

const getRequirementDetailsByUserId = async (req, res) => {
    const userId = req.query.userId;
    try {
        if (userId) {
            const requirementArr = await clientRequirementSchema.find({ createdBy: userId })
            res.status(StatusCodes.BAD_REQUEST).send(requirementArr);
        }
        else {
            const requirementArr = await clientRequirementSchema.find();
            res.status(StatusCodes.BAD_REQUEST).send(requirementArr);
        }
    }
    catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Fetching requirements failed.", reason: err.errors ? err.errors : err.errmsg })

    }
}

const deleteRequirement = async (req, res) => {
    const requirementId = req.params.id;
    try {
        if (requirementId) {
            const requirement = await clientRequirementSchema.findByIdAndDelete(requirementId)
            res.status(StatusCodes.OK).send({ requirement, msg: "Job deleted successfully." });
        }
        else {
            res.status(StatusCodes.BAD_REQUEST).send({ msg: "Invalid job id." });
        }
    }
    catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Removing job failed.", reason: err.errors ? err.errors : err.errmsg })

    }
}

const updateRequirement = async (req, res) => {
    const requirementObj = req.body;
    try {
        await clientRequirementSchema.findByIdAndUpdate(requirementObj._id, req.body);
        res.status(StatusCodes.OK).send({  msg: "Job updated successfully." });
    }
    catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Updating job failed.", reason: err.errors ? err.errors : err.errmsg })
    }
}

const applyForProject = async (req, res) => {
    const { jobId, userId } = req.body;

    if (!jobId || !userId)
        res.status(StatusCodes.BAD_REQUEST).send({ msg: "Please provide required id's" });

    let requiremntObj = {};
    try {
        requiremntObj = await clientRequirementSchema.findById(jobId);
        if (!requiremntObj) {
            return res.status(StatusCodes.BAD_REQUEST).send({ msg: "Please provide correct job id." });
        }
        if (requiremntObj.appliedList.indexOf(userId) === 0) {
            return res.status(StatusCodes.BAD_REQUEST).send({ msg: "User already applied for the job." });
        }
        else {
            requiremntObj.appliedList.push(userId);
            await clientRequirementSchema.updateOne({ _id: jobId },
            { $set: {                
                appliedList: requiremntObj.appliedList 
              } 
            });
            return res.status(StatusCodes.OK).send({ msg: "Job applied successfully." });
        }
    }
    catch (err) {
        console.log(err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "Updating job failed.", reason: err.errors ? err.errors : err.errmsg })

    }
}

const fetchAppliedListByJobId = async (req, res) => {
    const jobId = req.params.jobId;
    if(!jobId){
        res.status(StatusCodes.BAD_REQUEST).send({ msg: "Please provide required job id" });
    }

    try {
        requiremntObj = await clientRequirementSchema.findById(jobId);
        if (!requiremntObj) {
            return res.status(StatusCodes.BAD_REQUEST).send({ msg: "Please provide correct job id." });
        }

        let requirementList = await signUpSchema.find({"_id" : { $in : requiremntObj.appliedList}});
        return res.status(StatusCodes.OK).send(requirementList);

    } catch (error) {

         res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ msg: "there is no job with id you looking for.", reason: err.errors ? err.errors : err.errmsg })
    }
}



module.exports = { createRequirement, getRequirementDetailsByUserId, deleteRequirement, updateRequirement, applyForProject ,fetchAppliedListByJobId};