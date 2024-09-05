const router=require("express").Router();
const bookController=require("../../controllers/Admin/Book/book.controller")


router.get("/getAllBooks",
bookController.getAllBooks) 

router.get("/book",
bookController.getUserBookId)



module.exports=router