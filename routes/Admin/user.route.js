const router=require("express").Router();
const userController=require("../../controllers/Admin/User/user.controller")


router.get("/getAllUsers",
userController.getAllUsers) 

router.get("/user",
userController.getUserById)


router.delete("/deleteUser/:id",
userController.deleteUser)  



module.exports=router