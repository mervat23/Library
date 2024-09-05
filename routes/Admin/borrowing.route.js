const router=require("express").Router();
const borrowingController=require("../../controllers/Admin/Borrowing/borrowing.controller")


router.get("/getAllBorrowing",
borrowingController.getAllBorrowing) 

router.get("/borrowing", 
borrowingController.getAllBorrowingBooksOfUser)


module.exports=router