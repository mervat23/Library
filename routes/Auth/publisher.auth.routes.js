const router=require("express").Router();
const authController=require("../../controllers/Auth/publisher.controller")
let validator=require("../../helpers/common.validate") 
const {createPublisherValidation,loginValidation,resetPasswordValidation}=require("../../validation/publisher.validation")


router.post("/register",validator(createPublisherValidation),
authController.register) 

router.post("/login",validator(loginValidation),
authController.login)


router.post("/resetPassword",validator(resetPasswordValidation),
authController.resetPassword)


module.exports=router