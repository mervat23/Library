const router=require("express").Router();
const authController=require("../../controllers/Auth/author.controller")
let validator=require("../../helpers/common.validate") 
const {createAuthorValidation,loginValidation,resetPasswordValidation}=require("../../validation/author.validation")

router.post("/register",validator(createAuthorValidation),
authController.register)

router.post("/login",validator(loginValidation),
authController.login)


router.post("/resetPassword",validator(resetPasswordValidation),
authController.resetPassword)


// router.get("/verify/:token",
// authController.verifyToken)


module.exports=router