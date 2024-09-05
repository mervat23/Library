const router=require("express").Router();
const authController=require("../../controllers/Auth/user.controller")
let validator=require("../../helpers/common.validate") 
const {createUserValidation,loginValidation,
resetPasswordValidation,updateUserValidation}=require("../../validation/user.validation")


router.post("/register",validator(createUserValidation),
authController.register) 

router.post("/login",validator(loginValidation),
authController.login)


router.post("/resetPassword",validator(resetPasswordValidation),
authController.resetPassword)

router.put("/updateUser/:id",validator(updateUserValidation),
authController.updateUser)
        
module.exports=router