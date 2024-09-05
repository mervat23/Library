const router=require("express").Router();
const userController=require("../../controllers/App/User/Member/member.controller")



router.get("/user/:id",
userController.getUserById)

router.get("/borrowing",
userController.getAllBorrowingBooksOfUser) 

router.get("/getBookReviews/:id",
userController.getBookReviews) 


router.get("/books/available",
userController.viewAvailableBooks) 


router.get("/reviews/:id",
userController.getOwnReviews) 
    
    
module.exports=router