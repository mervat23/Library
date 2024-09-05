const router=require("express").Router();
const borrowingController=require("../../controllers/App/Borrowing/Member/member.controller")



router.get("/borrowing/:id",
borrowingController.getAllBorrowingBooksOfUser)

router.get("/viewBorrowingStatus/:id",
borrowingController.viewBorrowingStatus)



router.delete("/cancelBorrowing/:id",
borrowingController.cancelBorrowing)  

module.exports=router