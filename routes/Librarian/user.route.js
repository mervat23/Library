const router=require("express").Router();
const userController=require("../../controllers/App/User/Librarian/librarian.controller")




router.get("/user/:id",
userController.getUserById)


router.delete("/deleteUser/:id",
userController.deleteUser)  



module.exports=router