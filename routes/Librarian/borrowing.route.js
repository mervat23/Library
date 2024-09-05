const router=require("express").Router();
const borrowingController=require("../../controllers/App/Borrowing/Librarian/librarian.controller")
let validator=require("../../helpers/common.validate") 
const {createBorrowingValidation,updateBorrowingValidation}=require("../../validation/borrowing.validation")


router.post('/addUserBorrowing',validator(createBorrowingValidation),
borrowingController.addUserBorrowing)

router.get("/getAllBorrowing",
borrowingController.getAllBorrowing) 

router.put("/updateBorrowing/:id",validator(updateBorrowingValidation),
borrowingController.updateBorrowing) 

router.delete("/cancelBorrowing/:id",
borrowingController.cancelBorrowing)  

module.exports=router