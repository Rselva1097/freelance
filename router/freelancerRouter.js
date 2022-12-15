const express  = require("express");
const signupController = require("../controller/signUpController")
const requirementDetailsController = require("../controller/requirementDetailsController")


const freelancerRouter = express.Router();

freelancerRouter.post("/api/signup",signupController.createUser);
freelancerRouter.post("/api/login",signupController.login);
freelancerRouter.post("/api/requirement/",requirementDetailsController.createRequirement);
freelancerRouter.get("/api/requirement",requirementDetailsController.getRequirementDetailsByUserId);
freelancerRouter.delete("/api/requirement/:id",requirementDetailsController.deleteRequirement);
freelancerRouter.put("/api/requirement",requirementDetailsController.updateRequirement);
freelancerRouter.patch("/api/requirement",requirementDetailsController.applyForProject);
freelancerRouter.get("/api/requirement/:jobId/users",requirementDetailsController.fetchAppliedListByJobId);











module.exports=freelancerRouter;



